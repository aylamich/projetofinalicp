import { Link } from 'react-router-dom';
import { useState } from 'react';
import {AuthClient} from "@dfinity/auth-client"
import {HttpAgent} from "@dfinity/agent";


function index() {  

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Utilizado para apresentar os botão Login e Logout

  async function login() {

      // Criar o authClient
      let authClient = await AuthClient.create();

      // Inicia o processo de login e aguarda até que ele termine
      await authClient.login({
        // Redireciona para o provedor de identidade da ICP (Internet Identity)
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: async () => {  
            console.log("Autenticação bem-sucedida!");
          // Caso entrar neste bloco significa que a autenticação ocorreu com sucesso!
          const identity = authClient.getIdentity();
                    
          setIsLoggedIn(true);
          window.location.href = "/tarefas/"; // **********Redireciona para a página de tarefas após a autenticação concluida
            

        },
        
        windowOpenerFeatures: `left=${window.screen.width / 2 - 525 / 2},
                                top=${window.screen.height / 2 - 705 / 2},
                                toolbar=0,location=0,menubar=0,width=525,height=705`,
      })
      
      return false;
      
  };

  async function logout() {
      const authClient = await AuthClient.create();        
      await authClient.logout();     
      setIsLoggedIn(false);
  };  

  document.addEventListener("DOMContentLoaded", function() {    
     document.getElementById("logout").style.display = "none";
  });


  
  return (           

    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">TO-DO</h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Controle suas tarefas 100% onchain na ICP!</p>

            <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">    
            {!isLoggedIn && ( // *** botão entrar que vai para o login
                <button
                    onClick={login} 
                    className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                    ENTRAR
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                    </button>
                )}
            </div>

            {isLoggedIn && <button id="logout" onClick={logout}>Logout</button>}

        </div>
    </section>

  );

}

export default index; 