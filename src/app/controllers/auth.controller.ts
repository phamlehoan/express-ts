import { Request, Response } from 'express';
import { BadRequestError } from './concerns';
import models from '@models';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '@configs/database/enum';
import { generateToken, verifyToken } from '@configs/jwt';

export class AuthController {
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return BadRequestError(res, 'Email and password are required');
    }

    const user = await models.user.findUnique({ where: { email, password: bcrypt.hash(password, SALT_ROUNDS) } });

    if (!user) {
      return BadRequestError(res, 'Invalid email or password');
    }

    const accessToken = generateToken({ userId: user.id }); // 1 day
    const refreshToken = generateToken({ userId: user.id }, 60 * 60 * 24 * 7); // 7 days

    res.json({ accessToken, refreshToken });
  }

  refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return BadRequestError(res, 'Refresh token is required');
    }

    try {
      const decoded: any = verifyToken(refreshToken);
      const userId = decoded.userId;

      const user = await models.user.findUnique({ where: { id: userId } });

      if (!user) {
        return BadRequestError(res, 'Invalid refresh token');
      }

      const accessToken = generateToken({ userId: user.id }); // 1 day
      const newRefreshToken = generateToken({ userId: user.id }, 60 * 60 * 24 * 7); // 7 days

      res.json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      return BadRequestError(res, 'Invalid refresh token');
    }
  }

  forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    if(!email) {
      return BadRequestError(res, 'Email is required');
    }

    const user = await models.user.findUnique({ where: { email } });
    if(!user) {
      return BadRequestError(res, 'User not found');
    }

    const resetToken = generateToken({ userId: user.id }, 60 * 15); // 15 minutes
    // Send email

    res.json({ message: 'Password reset link sent to your email' });
  }

  recoverPassword = async (req: Request, res: Response) => {
    const { resetToken, newPassword, confirmPassword } = req.body;
    if (!resetToken || !newPassword || !confirmPassword) {
      return BadRequestError(res, 'All fields are required');
    }

    if (newPassword !== confirmPassword) {
      return BadRequestError(res, 'Passwords do not match');
    }

    try {
      const decoded: any = verifyToken(resetToken);
      const userId = decoded.userId;

      const user = await models.user.findUnique({ where: { id: userId } });
      if (!user) {
        return BadRequestError(res, 'Invalid reset token');
      }

      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
      await models.user.update({ where: { id: userId }, data: { passwordHash: hashedPassword } });

      res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
      return BadRequestError(res, 'Invalid reset token');
    }
  }
}

export const authController = new AuthController();
