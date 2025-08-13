import React, { useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import encryption from '../utils/encryption';

const MasterPasswordSetup = ({ onSetupComplete }) => {
    const [isSetup, setIsSetup] = useState(false);
    const [masterPassword, setMasterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if master password is already set
        const storedMasterHash = localStorage.getItem('masterPasswordHash');
        if (storedMasterHash) {
            setIsSetup(true);
        }
    }, []);

    const setupMasterPassword = async () => {
        if (masterPassword.length < 8) {
            toast.error('Master password must be at least 8 characters long!', {
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
            return;
        }

        if (masterPassword !== confirmPassword) {
            toast.error('Passwords do not match!', {
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
            return;
        }

        setIsLoading(true);
        try {
            // Create a test encryption to generate hash
            const testData = { test: 'data' };
            const encryptedTest = await encryption.encrypt(testData, masterPassword);
            
            // Store a hash of the master password for verification
            const encoder = new TextEncoder();
            const passwordBuffer = encoder.encode(masterPassword);
            const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const masterHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            
            localStorage.setItem('masterPasswordHash', masterHash);
            localStorage.setItem('masterPassword', masterPassword);
            
            toast.success('Master password set successfully!', {
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
            
            onSetupComplete(masterPassword);
        } catch (error) {
            toast.error('Failed to setup master password. Please try again.', {
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
        } finally {
            setIsLoading(false);
        }
    };

    const verifyMasterPassword = async () => {
        if (masterPassword.length === 0) {
            toast.error('Please enter your master password!', {
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
            return;
        }

        setIsLoading(true);
        try {
            // Verify the master password hash
            const encoder = new TextEncoder();
            const passwordBuffer = encoder.encode(masterPassword);
            const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const masterHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            
            const storedHash = localStorage.getItem('masterPasswordHash');
            
            if (masterHash === storedHash) {
                localStorage.setItem('masterPassword', masterPassword);
                onSetupComplete(masterPassword);
            } else {
                toast.error('Incorrect master password!', {
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
        } catch (error) {
            toast.error('Failed to verify master password. Please try again.', {
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
        } finally {
            setIsLoading(false);
        }
    };

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
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

            <div className="flex flex-col items-center justify-center min-h-screen text-center relative overflow-hidden">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full mx-4">
                    <h1 className="text-white text-3xl font-bold mb-6">
                        {isSetup ? 'Enter Master Password' : 'Setup Master Password'}
                    </h1>
                    
                    <div className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={masterPassword}
                                onChange={(e) => setMasterPassword(e.target.value)}
                                placeholder="Master Password"
                                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        {!isSetup && (
                            <div>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Master Password"
                                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}
                        
                        <button
                            onClick={isSetup ? verifyMasterPassword : setupMasterPassword}
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-full transition duration-200"
                        >
                            {isLoading ? 'Processing...' : (isSetup ? 'Unlock' : 'Setup Master Password')}
                        </button>
                    </div>
                    
                    <p className="text-gray-300 text-sm mt-4">
                        {isSetup 
                            ? 'Enter your master password to access your passwords.'
                            : 'Create a master password to encrypt your passwords. This password will be required to access your data.'
                        }
                    </p>
                </div>
            </div>
        </>
    );
};

export default MasterPasswordSetup; 