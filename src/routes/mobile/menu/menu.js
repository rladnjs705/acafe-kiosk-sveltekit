import axios from 'axios';
import Swal from 'sweetalert2';

export async function getCategoryList(){
    try {
        const response = await axios.get("/api/user/categories");    
        if(response.status == 200) {
            return response.data.data;
        } else{
            Swal.fire({
                icon: 'error',
                text: "서버 에러입니다"
              });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            text: "서버 에러입니다"
          });
    }
}