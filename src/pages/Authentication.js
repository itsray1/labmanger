// // // import { json, redirect } from 'react-router-dom';

// // // import AuthForm from '../components/AuthForm';

// // // function AuthenticationPage() {
// // //   return <AuthForm />;
// // // }

// // // export default AuthenticationPage;

// // // export async function action({ request }) {
// // //   const searchParams = new URL(request.url).searchParams;
// // //   const mode = searchParams.get('mode') || 'login';

// // //   if (mode !== 'login' && mode !== 'signup') {
// // //     throw json({ message: 'Unsupported mode.' }, { status: 422 });
// // //   }

// // //   const data = await request.formData();
// // //   const authData = {
// // //     email: data.get('email'),
// // //     password: data.get('password'),
// // //   };

// // //   const response = await fetch('http://localhost:8080/' + mode, {
// // //     method: 'POST',
// // //     headers: {
// // //       'Content-Type': 'application/json',
// // //     },
// // //     body: JSON.stringify(authData),
// // //   });

// // //   if (response.status === 422 || response.status === 401) {
// // //     return response;
// // //   }

// // //   if (!response.ok) {
// // //     throw json({ message: 'Could not authenticate user.' }, { status: 500 });
// // //   }

// // //   const resData = await response.json();
// // //   const token = resData.token;

// // //   localStorage.setItem('token', token);
// // //   const expiration = new Date();
// // //   expiration.setHours(expiration.getHours() + 1);
// // //   localStorage.setItem('expiration', expiration.toISOString());

// // //   return redirect('/');
// // // }
// import { redirect } from 'react-router-dom';
// import AuthForm from '../components/AuthForm';

// function AuthenticationPage() {
//   return <AuthForm />;
// }

// export default AuthenticationPage;
// export async function action({ request }) {
//   const mode = 'login';

//   if (mode !== 'login') {
//     throw new Response(JSON.stringify({ message: 'Unsupported mode.' }), {
//       status: 422,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }

//   const data = await request.formData();
//   const authData = {
//     username: data.get('username'),
//     password: data.get('password'),
//   };

//   const response = await fetch(`http://127.0.0.1:8000/api/token/login/`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(authData),
//   });

//   const resData = await response.json();
//   console.log(resData);
  


//   // تحقق من حالة الرد
//   if (response.status === 401) {
//     return { error: 'Invalid username or password. Please try again.' };
//   }

//   if (!response.ok) {
//     throw new Response(
//       JSON.stringify({ message: 'Could not authenticate user.' }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }

//   // تخزين التوكن إذا نجح تسجيل الدخول
//   const token = resData.token;

//   localStorage.setItem('token', token);
//   const expiration = new Date();
//   expiration.setHours(expiration.getHours() + 1);
//   localStorage.setItem('expiration', expiration.toISOString());

//   // إعادة التوجيه إلى صفحة lab إذا نجح تسجيل الدخول
//   return redirect('/lab');
// }


// // export async function action({ request }) {
  
// //   const mode =  'login';

// //   if (mode !== 'login' ) {
// //     throw new Response(JSON.stringify({ message: 'Unsupported mode.' }), {
// //       status: 422,
// //       headers: { 'Content-Type': 'application/json' },
// //     });
// //   }

// //   const data = await request.formData();
// //   const authData = {
// //     username: data.get('username'),
// //     password: data.get('password'),
// //   };


// //   const response = await fetch(`http://127.0.0.1:8000/api/token/login/`, {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json',
// //     },
// //     body: JSON.stringify(authData),
// //   });
  
// //   const Data = await response.json();
// //   console.log(Data); 
  
  

// //   if (response.status === 422 || response.status === 401) {
// //     return response;
// //   }

// //   if (!response.ok) {
// //     throw new Response(JSON.stringify({ message: 'Could not authenticate user.' }), {
// //       status: 500,
// //       headers: { 'Content-Type': 'application/json' },
// //     });
// //   }

// //   const resData = await response.json();
// //   const token = resData.token;

// //   localStorage.setItem('token', token);
// //   const expiration = new Date();
// //   expiration.setHours(expiration.getHours() + 1);
// //   localStorage.setItem('expiration', expiration.toISOString());

// //   return redirect('/lab');
// //  }
// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // function AuthenticationPage() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const navigate = useNavigate();

// //   async function loginHandler(event) {
// //     event.preventDefault();

// //     const response = await fetch('http://127.0.0.1:8000/api/token/login/', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ email, password }),
// //     });

// //     if (!response.ok) {
// //       alert('Login failed!');
// //       return;
// //     }

// //     const data = await response.json();
// //     localStorage.setItem('token', data.token); // Save token
// //     navigate('/lab'); // Redirect to labs page
// //   }

// //   return (
// //     <form onSubmit={loginHandler}>
// //       <div>
// //         <label>Email:</label>
// //         <input
// //           type="email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />
// //       </div>
// //       <div>
// //         <label>Password:</label>
// //         <input
// //           type="password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //       </div>
// //       <button type="submit">Login</button>
// //     </form>
// //   );
// // }

// // export default AuthenticationPage;


import { redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const mode = 'login'; // الحالة: تسجيل الدخول فقط

  if (mode !== 'login') {
    throw new Response(JSON.stringify({ message: 'Unsupported mode.' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await request.formData();
  const authData = {
    username: data.get('username'),
    password: data.get('password'),
  };

  const response = await fetch(`http://127.0.0.1:8000/api/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  const resData = await response.json();

  if (response.status === 401) {
    return { error: 'Invalid username or password. Please try again.' };
  }

  if (!response.ok || !resData.access || !resData.refresh) {
    throw new Response(
      JSON.stringify({ message: 'Could not authenticate user.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // تخزين التوكنات
  localStorage.setItem('access_token', resData.access);
  localStorage.setItem('refresh_token', resData.refresh);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  // التوجيه إلى صفحة المختبرات
  return redirect('/lab');
}

