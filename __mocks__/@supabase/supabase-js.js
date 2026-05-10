const mockStorage = {
  upload: jest.fn(),
  createSignedUrl: jest.fn(),
  remove: jest.fn(),
};

module.exports = {
  createClient: () => ({
    storage: {
      from: () => mockStorage,
    },
  }),
  __mockStorage: mockStorage,
};
