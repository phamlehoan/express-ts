import models from '@models';

async function main() {
  console.log('🚀 Đang bắt đầu seed dữ liệu...');

  // TODO: Seed dữ liệu vào cơ sở dữ liệu ở đây

  console.log('✅ Seed dữ liệu thành công!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await models.$disconnect();
  });