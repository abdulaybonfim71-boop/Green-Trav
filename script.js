// -------- CRIAR CONTA --------
function criarConta() {
    const tel = document.getElementById("regTelefone").value;
    const senha = document.getElementById("regSenha").value;
    const msg = document.getElementById("regMsg");

    if (tel === "" || senha === "") {
        msg.innerText = "Preenche todos os campos";
        msg.style.color = "red";
        return;
    }

    const user = { telefone: tel, senha: senha, saldo: 6 };
    localStorage.setItem("user_" + tel, JSON.stringify(user));

    msg.style.color = "green";
    msg.innerText = "Conta criada com sucesso!";
    setTimeout(() => { window.location.href = "index.html"; }, 1000);
}

// -------- LOGIN --------
function login() {
    const tel = document.getElementById("telefone").value;
    const senha = document.getElementById("senha").value;
    const msg = document.getElementById("msg");

    const userData = localStorage.getItem("user_" + tel);
    if (!userData) { msg.innerText = "Conta não existe"; msg.style.color = "red"; return; }

    const user = JSON.parse(userData);
    if (user.senha !== senha) { msg.innerText = "Senha incorreta"; msg.style.color = "red"; return; }

    localStorage.setItem("usuarioLogado", tel);
    localStorage.setItem("saldo", user.saldo);
    window.location.href = "dashboard.html";
}

// -------- MODAIS --------
function abrirRecarga() { document.getElementById("modalRecarga").style.display = "flex"; }
function abrirRetirada() { document.getElementById("modalRetirada").style.display = "flex"; }
function fecharModais() {
    document.getElementById("modalRecarga").style.display = "none";
    document.getElementById("modalRetirada").style.display = "none";
}

// -------- RECARGA ADMIN --------
function confirmarRecarga() {
    const senhaAdmin = document.getElementById("senhaAdmin").value;
    const valor = parseFloat(document.getElementById("valorRecarga").value);
    const tel = localStorage.getItem("usuarioLogado");
    const user = JSON.parse(localStorage.getItem("user_" + tel));

    if(senhaAdmin !== "1234") { alert("Senha admin incorreta!"); return; }
    if(isNaN(valor) || valor <= 0) { alert("Valor inválido."); return; }

    user.saldo += valor;
    localStorage.setItem("user_" + tel, JSON.stringify(user));
    localStorage.setItem("saldo", user.saldo);

    document.getElementById("saldo").innerText = user.saldo.toFixed(2);
    fecharModais();
    alert("Recarga concluída com sucesso!");
}

// -------- RETIRADA --------
function confirmarRetirada() {
    const iban = document.getElementById("iban").value.trim();
    const valor = parseFloat(document.getElementById("valorRetirada").value);
    const tel = localStorage.getItem("usuarioLogado");
    const user = JSON.parse(localStorage.getItem("user_" + tel));

    if (!iban.startsWith("PT50") || iban.length !== 25) { alert("IBAN inválido"); return; }
    if (isNaN(valor) || valor <= 0 || valor > user.saldo) { alert("Saldo insuficiente"); return; }

    user.saldo -= valor;
    localStorage.setItem("user_" + tel, JSON.stringify(user));
    localStorage.setItem("saldo", user.saldo);

    document.getElementById("saldo").innerText = user.saldo.toFixed(2);
    fecharModais();
}
