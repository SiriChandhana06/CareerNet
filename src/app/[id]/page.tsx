"use client";
import Image from "next/image";
import Navbar from "@/Components/Navbar";
import Head from "next/head";
import { useEffect, useState } from "react";


type Post = {
    _id: string;
    fileUrl: string;
    title: string;
    description: string;
    projectName: string;
    skills: [string];
    isHourly: boolean;
    payment: number;
    currency: string;
    email: string;
    category: string;
}

export default function PostDetailPage() {
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        // Extract the ID from the URL using window.location
        const pathArray = window.location.pathname.split("/");
        const dynamicId = pathArray[pathArray.length - 1]; // Assuming the ID is at the end of the URL
        setId(dynamicId);
    }, []);

    useEffect(() => {
        const fetchPostData = async () => {
            if (!id || typeof id !== "string") {
                setError("Invalid ID format");
                return;
            }

            try {
                const res = await fetch(`https://career-net-server.vercel.app/api/projects/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to load post data");
                }

                const data = await res.json();
                setPost(data.post);
            } catch (err: any) {
                setError(err.message);
            }
        };

        if (id) {
            fetchPostData();
        }
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-blue-300 ">
            <Head>
                <title>{post.projectName}</title>
                <meta property="og:title" content={post.projectName} />
                <meta property="og:description" content={post.description} />
                <meta property="og:image" content={post.fileUrl} />
                <meta
                    property="og:url"
                    content={`https://careernet.vercel.app/${post._id}`}
                />
                <meta property="og:type" content="article" />
            </Head>
            <Navbar />
            <div className="container mx-auto px-4 py-8 pt-20">
                <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg">
                    <Image
                        src={
                            post.fileUrl && post.fileUrl.trim() !== ""
                                ? post.fileUrl
                                : "/Assests/article.png"
                        }
                        alt="image"
                        height={200}
                        width={200}
                        className="w-20 h-20 mx-auto object-cover mb-4 bg-blue-500 rounded-full"
                    />
                    <h3 className="text-xl text-center font-semibold">{post.projectName}</h3>
                    <p className="text-gray-600 mt-2 text-center">
                        {post.description}
                    </p>
                    <div className="flex flex-wrap justify-center space-x-2 my-2">
                        {post.skills.map((skill: string, index: number) => (
                            <span
                                key={index}
                                className="bg-blue-500 text-white px-2 py-1 rounded-full my-1"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-lg font-semibold mt-4">
                                {post.isHourly ? "Per Hour" : "Fixed Payment"}
                            </p>
                            <p className="text-lg font-semibold">
                                {post.payment} {post.currency}
                            </p>
                        </div>
                        <div>
                            <a
                                href={`mailto:${post.email}`}
                                className="text-blue-500 mt-8 block hover:underline"
                            >
                                Apply now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}