// jest.setup.js


const localStorageMock = {
    getItem: jest.fn(() => '{}'),
    setItem: jest.fn(),
    clear: jest.fn()
  };
  global.localStorage = localStorageMock;
  
 
  global.firebase = {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        onSnapshot: jest.fn(),
        add: jest.fn()
      }))
    })),
    auth: jest.fn(() => ({
      onAuthStateChanged: jest.fn(),
      signOut: jest.fn()
    }))
  };


  