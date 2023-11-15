export const fetchResponses = async (userId, exerciseId) => {
    try {
      const response = await fetch(`${process.env.API_BACKEND}responseExl/${exerciseId}/${userId}`);
   
  
      const data = await response.json();
      return data;
    } catch (error) {
      
    }
  };
  