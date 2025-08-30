'use client';
import React from 'react';
import GameCanvas from './GameCanvas';
import Header from './header';
import { useAccount } from 'wagmi';
import Wallet from '../wallet';

export default function Game() {
    const { isConnected } = useAccount();

    return (
        <>
            {isConnected ? (
                <>
                    <Header />
                    <div className="min-h-screen bg-black-pattern flex flex-col relative">
                        <main className="flex-grow">
                            <div className="container mx-auto px-4 py-8">
                                <div className="flex flex-col items-center">
                                    <h1 className="font-funnel-display text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                                        Coup Ahoo - Pirate Dice Battle
                                    </h1>
                                    <GameCanvas />
                                </div>
                            </div>
                        </main>
                    </div>
                </>
            ) : (
                <Wallet />
            )}
        </>
    );
}