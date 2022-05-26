class SetStorage {
  
  loadSessionStorage() {
    
  }

  setSessionStorage(state: any, name: string) {
    try {
      const serializeState = JSON.stringify(state);
      // const encryptedData
    } catch(e) {
      console.error(e);
    }
  }

}