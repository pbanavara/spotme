"use client";

import Link from "next/link"
import React from 'react'
import Header from "../components/Header"
import Head from "next/head"
import Image from "next/image";
import va from '@vercel/analytics';
import { Input } from "postcss";
import { useEffect, useCallback, useState } from "react";
import { sql } from '@vercel/postgres'
import { FormEvent } from 'react'
import { createClient } from '@vercel/postgres';

export default function Home() {

    const workout = ["running", "rowing", "benchpress", "pullup", "boxing", "pushup", "pullup", "rowing", "running"]
    const [newName, setNewName] = useState("");

    const shuffle = useCallback(() => {
        let ind = Math.floor(Math.random() * workout.length)
        setNewName(workout[ind])
    }, [])

    useEffect(() => {

        const intervalId = setInterval(shuffle, 500)
        return () => clearInterval(intervalId)
    }, [shuffle])

    // line above ^ gives me the error below
    const gameUrl = process.env.NEXT_PUBLIC_S3_URL + "website_main_image.png"
    const profUrl = process.env.NEXT_PUBLIC_S3_URL + "fed_out.m4v"
    

    async function onSubmit(event) {
        event.preventDefault()
        console.log(event.target.email.value)
        const client = createClient();
        await client.connect();

        try {
            await client.sql`INSERT INTO "USERS" (id, email) VALUES (
                ${Math.floor(Math.random() * 1000)}, 
                ${event.target.email.value});`;
            console.log("Successfully added row in messages table");
            alert("Thank you we will get back to you shortly")
            return;
        } catch (error) {
            alert("Sorry, please try again")
            throw new Error(`Yikes! We ran into an error: ${error}`);
        }
        // ...
    }
    return (
        <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2">
            <Head>
                <title>spptMe | Check your form</title>
            </Head>
            <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-2 mt-1">
                <Header />
                <br></br>
                <h1 className="mx-auto max-w-4xl font-display text-3xl font-bold tracking-normal text-slate-900 sm:text-5xl">
                    How is my {" "}
                </h1>
                <br></br>
                <h1 className="mx-auto max-w-4xl font-display text-3xl font-bold tracking-normal text-slate-900 sm:text-5xl"> 
                <span className="relative whitespace-nowrap text-[#3290EE]">
                    <span className="relative">{newName}</span>
                    </span>{" "}
                    </h1>
                <br></br>
                <h1 className="mx-auto max-w-4xl font-display text-3xl font-bold tracking-normal text-slate-900 sm:text-5xl">
                    form? 
                </h1> 
                <br></br>
                <div>
                    <video autoPlay muted controls loop style={{ width: '500px', height: '300px' }}>
                        <source src="IMG_0631.mp4" type="video/mp4" />
                    </video>
                    <video autoPlay muted controls loop style={{ width: '500px', height: '300px' }}>
                        <source src="/output.mp4" type="video/mp4" />
                    </video>
                    <h2 className="mx-auto max-w-4xl font-display text-xl font-bold tracking-normal text-slate-900 sm:text-xl">
                        Analysis: Your left foot has a heel strike.
                    </h2> 
                </div>
                <div className="flex justify-between items-center w-full flex-col sm:mt-5 mt-1">
                    <br></br>
                    <h1 className="mx-auto max-w-4xl font-display text-3xl font-bold tracking-normal text-slate-900 sm:text-3xl">
                        Want to upload your videos?
                    </h1>
                    <div className="flex flex-col space-y-8 mt-4 mb-16">
                        <div className="flex sm:space-x-2 sm:flex-row flex-col sm:text-xl text-xl font-display">
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                                <div className="mb-4">
                                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" placeholder="Enter your email" />
                                </div>
                                <div className="mb-6">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                                        Notify me
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
            </main>
            </div>
        );
    }