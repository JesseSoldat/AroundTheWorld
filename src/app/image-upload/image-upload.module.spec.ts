import { ImageUploadModule } from './image-upload.module';

describe('ImageUploadModule', () => {
  let imageUploadModule: ImageUploadModule;

  beforeEach(() => {
    imageUploadModule = new ImageUploadModule();
  });

  it('should create an instance', () => {
    expect(imageUploadModule).toBeTruthy();
  });
});
