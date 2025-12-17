import mongoose from 'mongoose';
import { expect } from 'chai';

describe('MongoDB Connection', function () {
  this.timeout(10000);

  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should connect to MongoDB successfully', () => {
    expect(mongoose.connection.readyState).to.equal(1);
  });

  it('should have a valid database name', () => {
    expect(mongoose.connection.name).to.be.a('string');
    expect(mongoose.connection.name).to.not.be.empty;
  });

  it('should be able to perform a basic query', async () => {
    const collections = await mongoose.connection.db.listCollections().toArray();
    expect(collections).to.be.an('array');
  });

  it('should handle connection errors gracefully', async () => {
    const invalidUri = 'mongodb://invalid:27017/test/thatdoesnotexist';
    try {
      await mongoose.createConnection(invalidUri, {
        serverSelectionTimeoutMS: 2000,
      });
    } catch (error) {
      expect(error).to.exist;
      expect(error.name).to.equal('MongooseServerSelectionError');
    }
  });
});