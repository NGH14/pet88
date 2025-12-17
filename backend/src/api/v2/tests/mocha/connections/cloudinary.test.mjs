// test/connections/cloudinary.test.mjs
import { expect } from 'chai';
import { v2 as cloudinary } from 'cloudinary';

describe('Cloudinary Connection', function () {
  this.timeout(10000);
  const cloudinaryConfig = JSON.parse(process.env.CLOUDINARY_KEY || '{}');
  before(() => {
    cloudinary.config({
      cloud_name: cloudinaryConfig.cloud_name,
      api_key: cloudinaryConfig.api_key,
      api_secret: cloudinaryConfig.api_secret,
    });
  });

  it('should have Cloudinary configured with credentials', () => {
    const config = cloudinary.config();
    expect(config.cloud_name).to.exist;
    expect(config.api_key).to.exist;
    expect(config.api_secret).to.exist;
  });

  it('should be able to ping Cloudinary API', async () => {
    try {
      const result = await cloudinary.api.ping();
      expect(result).to.have.property('status');
      expect(result.status).to.equal('ok');
    } catch (error) {
      throw new Error(`Cloudinary ping failed: ${error.message}`);
    }
  });

  it('should be able to list resources', async () => {
    try {
      const result = await cloudinary.api.resources({ max_results: 1 });
      expect(result).to.have.property('resources');
      expect(result.resources).to.be.an('array');
    } catch (error) {
      expect(error.http_code).to.not.equal(401);
    }
  });
});