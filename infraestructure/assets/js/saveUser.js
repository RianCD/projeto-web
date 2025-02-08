// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", function () {
    // Obtém o formulário pelo ID
    const form = document.getElementById("save-user-form");

    // Adiciona um listener para o evento de submit do formulário
    form.addEventListener("submit", async function (event) {
        // Impede o comportamento padrão de recarregar a página ao enviar o formulário
        event.preventDefault();

        // Coleta dos valores dos campos do formulário
        const name = document.getElementById("exampleInputName1").value; // Nome do usuário
        const login = document.getElementById("username").value; // Nome de usuário
        const password = document.getElementById("exampleInputPassword1").value; // Senha
        const email = document.getElementById("exampleInputEmail1").value; // E-mail

        // Validação dos campos: verifica se todos os campos foram preenchidos
        if (!name || !login || !password || !email) {
            alert("Por favor, preencha todos os campos."); // Exibe um alerta se algum campo estiver vazio
            return; // Interrompe a execução do código
        }

        // Cria um objeto com os dados do usuário
        const userData = {
            name: name,
            username: login,
            email: email,
            password: password
        };

        try {
            // Envia uma requisição POST para o endpoint do servidor
            const response = await fetch("http://localhost:8080/users/save", {
                method: "POST", // Método HTTP
                headers: {
                    "Content-Type": "application/json" // Define o tipo de conteúdo como JSON
                },
                body: JSON.stringify(userData) // Converte o objeto userData para JSON
            });

            // Verifica se a resposta da requisição foi bem-sucedida (status 200-299)
            if (response.ok) {
                const result = await response.json(); // Converte a resposta para JSON
                alert("Cadastro realizado com sucesso!"); // Exibe uma mensagem de sucesso
                form.reset(); // Limpa os campos do formulário
                window.location.href = "../pages/adm-page.html"; // Redireciona para a página do administrador
            } else {
                // Se a resposta não for bem-sucedida, exibe uma mensagem de erro
                const errorData = await response.json(); // Converte a resposta de erro para JSON
                alert(`Erro ao cadastrar: ${errorData.message || "Tente novamente mais tarde"}`);
            }
        } catch (error) {
            // Captura e trata erros de conexão ou outros erros inesperados
            console.error("Erro ao enviar requisição:", error); // Exibe o erro no console
            alert("Erro ao conectar com o servidor. Verifique sua conexão."); // Exibe uma mensagem de erro para o usuário
        }
    });
});