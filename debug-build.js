
import { build } from 'vite';

async function runBuild() {
  try {
    await build();
    console.log('Build successful!');
  } catch (error) {
    console.error('BUILD FAILED WITH ERROR:');
    console.error(error);
    if (error.errors) {
      console.error('DETAILED BINDING ERRORS:');
      error.errors.forEach((err, i) => {
        console.error(`Error ${i + 1}:`, err);
      });
    }
    process.exit(1);
  }
}

runBuild();
