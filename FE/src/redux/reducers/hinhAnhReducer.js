const Intstate = {
    hinhAnh: [],
    numberProduct: 0
  };
  
  class HinhAnhReducer {
    static reducer(state = Intstate, action) {
      switch (action.type) {
        case 'SET_HINHANH':
          return {
            ...state,
            hinhAnh: action.payload,
          };
        case 'UPDATE_NUMBER': 
          return {
            ...state,
            numberProduct: action.payload
          }
        default:
          return state;
      }
    }
  }
  
  export default HinhAnhReducer;