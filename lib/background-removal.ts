import remove from '@imgly/background-removal';

let worker: any = null;

export const initBackgroundRemoval = async () => {
  if (!worker) {
    worker = await remove({
      model: 'medium', // or 'small' or 'large'
      progress: (progress: number) => {
        console.log('Loading model...', progress);
      },
      debug: process.env.NODE_ENV === 'development',
    });
  }
  return worker;
};

export const cleanupBackgroundRemoval = async () => {
  if (worker) {
    await worker.terminate();
    worker = null;
  }
}; 