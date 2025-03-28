import React, { use } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState } from 'react';
import { useEffect } from 'react';

const Manager = () => {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);
    const ref = useRef();

    const getPasswords = async () => {
        let req = await fetch('http://localhost:3000/');
        let passwords = await req.json();
        setPasswordArray((passwords));
         
    }

    useEffect(() => {
        getPasswords();
    }, [])


    const showPassword = () => {
        console.log(ref.current.src);
        if (ref.current.src.includes('/icons/eye.png')) {
            ref.current.src = '/icons/eyecross.png';
            setShow(false);
        } else {
            ref.current.src = '/icons/eye.png';
            setShow(true);
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            
            if (form.id) {
                // Delete existing entry before adding a new one
                await fetch("http://localhost:3000/", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: form.id })
                });
            }

            const newPasswordEntry = { ...form, id: uuidv4() };
            setPasswordArray([...passwordArray.filter(item => item.id !== form.id), newPasswordEntry]);
            
            await fetch("http://localhost:3000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPasswordEntry)
            });
            
            setForm({ site: '', username: '', password: '' });
        } else {
            toast.error('Please fill the fields correctly!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce
            });
        }
    };

    const deletePassword =async (id ) => {
        console.log("deleting password with id:", id);   
        let c = confirm("Are you sure you want to delete this password?");
        if (c){
            setPasswordArray(passwordArray.filter(item=>item.id !== id));
            //localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id !== id)))
            let res = await fetch('http://localhost:3000/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id}) 
            });
        }
    }
    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id);
        if (passwordToEdit) {
            setForm(passwordToEdit);
        }
    };

    const handelchange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const copyText = (text) => {
        toast.info('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce
        });
        navigator.clipboard.writeText(text);
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div>
                <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            </div>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center py-28 text-center relative overflow-hidden">
                <h1 className="relative text-white text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
                    <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        Securely store and manage passwords.
                    </span>
                </h1>
            </div>

            <div className="mx-auto max-w-4xl">
                <div className="text-black flex flex-col items-center justify-center p-4 gap-8">
                    <input type="text" value={form.site} onChange={handelchange} name="site" placeholder='Enter Website URL' required className='rounded-full border border-black  w-full px-4 py-2' />
                    <div className="flex flex-col md:flex-row gap-8 w-full">
                        <input type="text" value={form.username} onChange={handelchange} name="username" placeholder='Username' required className='rounded-full border border-black md:w-1/2 w-full px-4 py-2' />

                        <div className="relative w-1/2">
                            <input type={show ? 'text' : 'password'} onChange={handelchange} value={form.password} name="password" placeholder='Password' required className='rounded-full border border-black w-full md:w-full px-4 py-2' />
                            <span className='absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={20} src="/icons/eyecross.png" alt="" />
                            </span>
                        </div>

                    </div>
                    <button type='Submit' onClick={savePassword} className='flex justify-center items-center bg-white px-6 py-1 rounded-full '>
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#000000">
                        </lord-icon>
                        Add Password</button>
                </div>
                <div className='passowrds px-4 py-5'>
                    <h2 className='text-white text-3xl font-bold'>Your Passwords</h2>
                    {passwordArray == 0 && <div className='text-white py-4'>No passwords are saved yet.</div>}
                    {passwordArray != 0 &&
                        <table className="table-auto w-full bg-[#00000000] text-white my-5 overflow-hidden mb-10">
                            <thead>
                                <tr>
                                    <th className='py-4 text-xl '>Site</th>
                                    <th className='py-4 text-xl'>Username</th>
                                    <th className='py-4 text-xl'>Password</th>
                                    <th className='py-4 text-xl'>Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='py-2 border border-white text-center w-32'><a href={item.site} target='_blank'>{item.site}</a></td>
                                            <td className='py-2 border border-white text-center w-32'>{item.username}</td>
                                            <td className='py-2 border border-white text-center w-32'>
                                                <div className="flex items-center justify-center gap-2">
                                                    {"*".repeat(item.password.length)}
                                                    <span className="material-symbols-outlined cursor-pointer text-white transition duration-200 hover:text-gray-300" onClick={() => copyText(item.password)}>content_copy</span>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white text-center w-12'>
                                                <span className='cursor-pointer' onClick={()=>{editPassword(item.id)}}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff,secondary:#000000"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                                <span className='cursor-pointer' onClick={()=>{deletePassword(item.id)}}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff,secondary:#000000"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager