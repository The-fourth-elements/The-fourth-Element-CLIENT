
export const handleSubmit = async ( values, router, country, region) => {
    try {
        values.country = country;
        values.region = region
        console.log(values)
      const response = await fetch("", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Registro exitoso de: " + data.username);
        router.push('/login');
      } else {
        const errorData = await response.json();
        alert("Error en el registro: " + errorData.message);
      }
    } catch (error) {
      alert('Ocurrió un error al registrar.');
    }
  };
 
  
  
  
  
  
  