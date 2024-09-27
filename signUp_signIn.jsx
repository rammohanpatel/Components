// It uses Nextjs and Shadcdn 

"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUser } from '@/lib/appwrite.config';
import { useRouter } from 'next/navigation'; // Correctly use useRouter

// Validation Schemas
const signUpSchema = z.object({
    name: z.string()
        .min(2, "Name should have at least 2 characters.")
        .max(50, "Name should not exceed 50 characters.")
        .refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value), 'Name should contain only alphabets.'),
    email: z.string().email("Email must be valid."),
    password: z.string().min(6, "Password should have at least 6 characters."),
    confirmPassword: z.string().min(6, "Password should have at least 6 characters.")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});

const signInSchema = z.object({
    email: z.string().email("Email must be valid."),
    password: z.string().min(6, "Password should have at least 6 characters."),
});

const SignUp = () => {
    const router = useRouter(); // Initialize the router
    const [signInToggle, setSignInToggle] = useState(false); // Toggle state

    // Initialize separate useForm instances
    const signUpForm = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const signInForm = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Submission Handlers
    const onSignUpSubmit = async (values) => {
        const { name, email, password } = values;
        
        try {
            const userData = { name, email, password };
            console.log('values:', userData);
            const user = await createUser(userData); // Implement createUser appropriately
            console.log(user);
            if (user) {
                router.push(`/patients/${user.$id}/register`);
            }
        } catch (error) {
            console.error('Error creating user:', error);
            // Optionally, set form errors here
        }
    };

    const onSignInSubmit = async (values) => {
        const { email, password } = values;
        try {
            // Implement sign-in logic, e.g., authenticateUser
            const user = await authenticateUser({ email, password }); // Implement authenticateUser appropriately
            if (user) {
                router.push(`/dashboard`); // Redirect to dashboard or appropriate page
            }
        } catch (error) {
            console.error('Error signing in:', error);
            // Optionally, set form errors here
        }
    };

    return (


        <div className="signUpWrapper">
            <div className='flex flex-row space-x-3'>
                <h1 className="text-3xl text-center mt-28">Welcome to HealthSync</h1>
                {/* Uncomment if logo is available */}
                {/* <Image src='/logo.png' width={150} height={50} className='' /> */}
            </div>

            <div className="formWrapper">
                <div className="left">
                    <h3 className="title">Welcome Back!</h3>
                    <p>To keep connected with us please login with your personal info</p>
                    <Button
                        onClick={() => setSignInToggle(!signInToggle)}
                        className='border-zinc-500 text-zinc-300 hover:border-zinc-200 hover:text-zinc-100 transition-colors border rounded-full px-8'>
                        {signInToggle ? 'SignUp' : 'SignIn'}
                    </Button>
                </div>

                {signInToggle ? (
                    <div className="right">
                        <h3 className='text-center text-2xl font-semibold'>SignIn Here</h3>
                        <Form {...signInForm}>
                            <form onSubmit={signInForm.handleSubmit(onSignInSubmit)}>
                                <FormField
                                    control={signInForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className='space-y-0 mb-2'>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="admin@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signInForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className='space-y-0 mb-2'>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="********" type='password' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className='w-full'>Submit</Button>
                            </form>
                        </Form>
                    </div>
                ) : (
                    <div className="right">
                        <h3 className='text-center text-2xl font-semibold'>Register Here</h3>
                        <Form {...signUpForm}>
                            <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}>
                                <FormField
                                    control={signUpForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className='space-y-0 mb-2'>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signUpForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className='space-y-0 mb-2'>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="admin@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signUpForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className='space-y-0 mb-2'>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="********" type='password' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signUpForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className='space-y-0 mb-2'>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="********" type='password' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className='w-full'>Submit</Button>
                            </form>
                        </Form>
                    </div>
                )}
            </div>
        </div>
     );
}

export default SignUp;
