import { db } from '../../firebaseConnection';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './App.css';
import { useState, useEffect } from 'react';

function Home() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const snapshot = await getDocs(collection(db, 'users'));
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });

      setUsers(lista);
    }

    loadUsers();
  }, []);

  function handleRegister(event) {
    event.preventDefault();

    if (nome === '' || idade === '' || email === '') {
      alert('Preencha todos os campos!');
      return;
    }

    addDoc(collection(db, 'users'), {
      name: nome,
      idade: idade,
      email: email
    })
    .then((docRef) => {
      alert('Cadastrado com sucesso!');

      const newUser = {
        id: docRef.id,
        name: nome,
        idade: idade,
        email: email
      };

      setUsers((prevUsers) => [...prevUsers, newUser]);

      setNome('');
      setIdade('');
      setEmail('');
    })
    .catch((error) => {
      console.log('Erro ao cadastrar usuário: ', error);
    });
  }

  function deleteUser(id) {
    const docRef = doc(db, 'users', id);

    deleteDoc(docRef)
    .then(() => {
      console.log('Usuário excluído com sucesso!');
      // Remove o usuário da tela também
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    })
    .catch((error) => {
      console.log('Erro ao excluir usuário: ', error);
    });
  }

  return (
    <div className="container">
      <form>

        <h1>Cadastro de usuários</h1>

        <input 
          name='name' 
          type='text' 
          placeholder='Nome' 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input 
          name='age' 
          type='number' 
          placeholder='Idade' 
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />

        <input 
          name='email' 
          type='email' 
          placeholder='Email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}  
        />

        <button onClick={handleRegister}>Cadastrar</button>
      </form>

      {users.map((item) => (
        <div key={item.id} className='card'>
          <div>
            <strong>Nome: </strong><span>{item.name}</span><br />
            <strong>Idade: </strong><span>{item.idade}</span><br />
            <strong>Email: </strong><span>{item.email}</span>
          </div>
          <button onClick={() => deleteUser(item.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
