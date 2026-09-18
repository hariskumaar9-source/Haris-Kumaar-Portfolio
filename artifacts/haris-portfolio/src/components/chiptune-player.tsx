import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  RotateCcw,
  Radio,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { retroAudio } from './retro-os';

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  year: string;
  album: string;
  genre: string;
  src: string;
  fallbackSrc?: string;
  cassetteColor: string;
  albumCover: string;
  duration: number; // approximate duration in seconds
  lyrics: { time: number; text: string }[];
  isExplicit?: boolean;
  edition?: string;
}

export const JUKEBOX_SONGS: SongTrack[] = [
  {
    id: 'flashing-lights',
    title: 'Flashing Lights',
    artist: 'Kanye West',
    year: '2007',
    album: 'Graduation',
    genre: 'Studio Master MP3 · Synth Hip-Hop',
    src: '/audio/flashing-lights.mp3',
    fallbackSrc: 'https://archive.org/download/Kanye_West_-_Live_At_Coachella-2011/10%29%20Kanye%20West%20-%20Flashing%20Lights.mp3',
    cassetteColor: '#d8ee57',
    albumCover: '/albums/kanye-graduation.svg',
    duration: 237,
    isExplicit: true,
    edition: 'ORIGINAL 2007 RELEASE',
    lyrics: [
      { time: 0, text: '♪ [Studio Strings Rising in F# Minor...] ♪' },
      { time: 11, text: "♪ She don't believe in shooting stars... ♪" },
      { time: 22, text: '♪ But she believe in shoes and cars... ♪' },
      { time: 33, text: '♪ Wood floors in the new apartment... ♪' },
      { time: 44, text: '★ FLASHING LIGHTS... LIGHTS... ★' },
      { time: 55, text: '♪ Feeling like Katrina with no FEMA... ♪' },
      { time: 66, text: '★ FLASHING LIGHTS... WHAT DO YOU MEAN? ★' },
      { time: 88, text: "♪ In the room starin' at the ceiling... ♪" },
      { time: 110, text: '★ FLASHING LIGHTS... LIGHTS... ★' },
      { time: 140, text: '♪ You know we had to make it through the fire... ♪' },
      { time: 175, text: '★ FLASHING LIGHTS... WHAT DO YOU MEAN? ★' },
      { time: 210, text: '♪ [Orchestral Outro · Violin & 808s Fading...] ♪' },
    ],
  },
  {
    id: 'i-wanna-love-you',
    title: 'I Wanna Fuck / Love You',
    artist: 'Akon ft. Snoop Dogg',
    year: '2006',
    album: 'Konvicted',
    genre: 'Studio Master MP3 · Explicit R&B Classic',
    src: '/audio/i-wanna-love-you.mp3',
    fallbackSrc: 'https://archive.org/download/doggday/Snoop%20Dogg%20-%20I%20Wanna%20Love%20You%20%28feat.%20Akon%29.mp3',
    cassetteColor: '#ffd166',
    albumCover: '/albums/akon-konvicted.svg',
    duration: 179,
    isExplicit: true,
    edition: 'ORIGINAL UNRATED MASTER',
    lyrics: [
      { time: 0, text: '♪ [Konvict Muzik... Akon and Snoop, yeah...] ♪' },
      { time: 10, text: "♪ I see you windin' and grindin' up on that floor... ♪" },
      { time: 23, text: '★ I WANNA FUCK YOU... YOU ALREADY KNOW! ★' },
      { time: 42, text: "♪ Shawty I can see you workin' up on that stage... ♪" },
      { time: 64, text: "★ SNOOP DOGG: 'Step on the scene with a fresh pair of jeans...' ★" },
      { time: 95, text: '★ I WANNA FUCK YOU... GIRL YOU GOT ME HOOKED! ★' },
      { time: 135, text: '♪ [Smooth R&B Rhodes & 808 Beat Groove...] ♪' },
    ],
  },
  {
    id: 'baby-one-more-time',
    title: '...Baby One More Time',
    artist: 'Britney Spears',
    year: '1998',
    album: '...Baby One More Time',
    genre: 'Studio Master MP3 · Pop Classic',
    src: '/audio/baby-one-more-time.mp3',
    fallbackSrc: 'https://archive.org/download/babyonemore/01%20Baby%20one%20more%20time.mp3',
    cassetteColor: '#ff6b8b',
    albumCover: '/albums/britney-baby.svg',
    duration: 210,
    isExplicit: true,
    edition: 'ORIGINAL 1998 ALBUM MASTER',
    lyrics: [
      { time: 0, text: '♪ [Iconic 3-Note Piano Stabs · Max Martin Production...] ♪' },
      { time: 9, text: '♪ Oh baby, baby, how was I supposed to know... ♪' },
      { time: 20, text: "♪ That something wasn't right here... ♪" },
      { time: 31, text: "♪ Oh baby, baby, I shouldn't have let you go... ♪" },
      { time: 43, text: '★ MY LONELINESS IS KILLING ME (AND I)... ★' },
      { time: 53, text: '★ I MUST CONFESS I STILL BELIEVE (STILL BELIEVE)! ★' },
      { time: 64, text: '★ HIT ME BABY ONE MORE TIME! ★' },
      { time: 95, text: '♪ Oh baby, baby, the reason I breathe is you... ♪' },
      { time: 135, text: '★ HIT ME BABY ONE MORE TIME! ★' },
      { time: 175, text: '♪ [Funk Bass & Dance Pop Breakdown Fading...] ♪' },
    ],
  },
  {
    id: 'im-still-in-love',
    title: "I'm Still In Love With You",
    artist: 'Sean Paul ft. Sasha',
    year: '2002',
    album: 'Dutty Rock',
    genre: 'Studio Master MP3 · Dancehall Reggae',
    src: '/audio/im-still-in-love.mp3',
    fallbackSrc: 'https://archive.org/download/sean-paul-im-still-in-love-with-you-official-video_202608/Sean%20Paul%20-%20I%27m%20Still%20In%20Love%20With%20You%20%28Official%20Video%29.mp3',
    cassetteColor: '#06d6a0',
    albumCover: '/albums/sean-paul-dutty.svg',
    duration: 275,
    isExplicit: true,
    edition: 'ORIGINAL 2002 DANCEHALL MASTER',
    lyrics: [
      { time: 0, text: '♪ [Uptown Dancehall Riddim & Acoustic Strumming...] ♪' },
      { time: 12, text: "♪ SASHA: 'I'm still in love with you boy... well I'm a man that don't deceive girl...' ♪" },
      { time: 25, text: "★ SEAN PAUL: 'Dutty yeah! A girl need a thug fi keep har warm!' ★" },
      { time: 45, text: '♪ Constant loving we give you girl, keep you inna groove! ♪' },
      { time: 70, text: "★ 'I'M STILL IN LOVE WITH YOU BOY...' ★" },
      { time: 95, text: '♪ Giri giri giri pon di dancehall floor! Sean de Paul ready fi di ride! ♪' },
    ],
  },
  {
    id: 'lose-yourself',
    title: 'Lose Yourself',
    artist: 'Eminem',
    year: '2002',
    album: '8 Mile OST',
    genre: 'Studio Master MP3 · Explicit Hip-Hop',
    src: '/audio/lose-yourself.mp3',
    fallbackSrc: 'https://archive.org/download/eminem-lose-yourself_202507/Eminem%20-%20Lose%20Yourself.mp3',
    cassetteColor: '#118ab2',
    albumCover: '/albums/eminem-8mile.svg',
    duration: 327,
    isExplicit: true,
    edition: 'ORIGINAL UNCENSORED MASTER',
    lyrics: [
      { time: 0, text: '♪ [Tense Repeating Piano Note & Acoustic Guitar Strum...] ♪' },
      { time: 10, text: "♪ Look, if you had one shot, or one opportunity... ♪" },
      { time: 22, text: '♪ To seize everything you ever wanted... would you capture it? ♪' },
      { time: 33, text: '♪ His palms are sweaty, knees weak, arms are heavy... ♪' },
      { time: 43, text: "♪ Mom's spaghetti, he's nervous, but on the surface he looks calm and ready... ♪" },
      { time: 53, text: '★ YOU BETTER LOSE YOURSELF IN THE MUSIC, THE MOMENT, YOU OWN IT! ★' },
      { time: 82, text: '★ YOU ONLY GET ONE SHOT, DO NOT MISS YOUR CHANCE TO BLOW! ★' },
      { time: 112, text: "♪ The soul's escaping through this hole that is gaping... ♪" },
      { time: 145, text: '★ THIS OPPORTUNITY COMES ONCE IN A LIFETIME, YO! ★' },
    ],
  },
  {
    id: 'million-dollar-baby',
    title: 'Million Dollar Baby',
    artist: 'Tommy Richman',
    year: '2024',
    album: 'Coyote',
    genre: 'Studio Master MP3 · Neo-Funk R&B',
    src: '/audio/million-dollar-baby.mp3',
    fallbackSrc: 'https://archive.org/download/tommy-richman-million-dollar-baby-official-visualizer-192-k/Tommy%20Richman%20-%20MILLION%20DOLLAR%20BABY%20%28Official%20Visualizer%29%20%28192K%29.mp3',
    cassetteColor: '#9b5de5',
    albumCover: '/albums/tommy-coyote.svg',
    duration: 155,
    isExplicit: true,
    edition: 'ORIGINAL 2024 RELEASE',
    lyrics: [
      { time: 0, text: '♪ [VHS Synth Whine & Lo-Fi 80s Drum Break...] ♪' },
      { time: 10, text: "♪ Yeah, I'm just a million dollar baby... ♪" },
      { time: 22, text: '♪ Nobody call me, nobody can save me... ♪' },
      { time: 34, text: '★ DO IT TO ME BABY, DO IT ONE MORE TIME! ★' },
      { time: 50, text: '♪ Slap bass groove, VHS analog warmth, late night VHS drive... ♪' },
      { time: 75, text: '★ I SLOW IT DOWN, MAKE YA FEEL ALRIGHT! ★' },
    ],
  },
  {
    id: 'hey-sexy-lady',
    title: 'Hey Sexy Lady',
    artist: 'Shaggy ft. Brian & Tony Gold',
    year: '2002',
    album: 'Lucky Day',
    genre: 'Studio Master MP3 · Dancehall Classic',
    src: '/audio/hey-sexy-lady.mp3',
    fallbackSrc: 'https://archive.org/download/shaggy-hey-sexy-lady-ft.-brian-tony-gold-official-music-video-160k/Shaggy%20-%20Hey%20Sexy%20Lady%20ft.%20Brian%20%26%20Tony%20Gold%20%28Official%20Music%20Video%29_160k.mp3',
    cassetteColor: '#f15bb5',
    albumCover: '/albums/shaggy-lucky-day.svg',
    duration: 213,
    isExplicit: true,
    edition: 'ORIGINAL 2002 RELEASE',
    lyrics: [
      { time: 0, text: '♪ [Dancehall Guitar Strum & Shaggy Intro...] ♪' },
      { time: 8, text: "★ BRIAN & TONY GOLD: 'Hey sexy lady, I like your flow...' ★" },
      { time: 18, text: "♪ Your body's bangin', out of control! ♪" },
      { time: 27, text: "★ SHAGGY: 'Sexy, sensual, sweet and complete...' ★" },
      { time: 42, text: "♪ You drive me crazy when you move your body so neat! ♪" },
      { time: 60, text: "★ 'HEY SEXY LADY, I LIKE YOUR FLOW...' ★" },
      { time: 82, text: "♪ SHAGGY: 'Woman you got me caught inna your net...' ♪" },
      { time: 105, text: "♪ Sweet like chocolate, you never regret! ♪" },
      { time: 130, text: "★ 'HEY SEXY LADY, YOU DRIVE ME CRAZY!' ★" },
      { time: 165, text: "♪ [Irresistible Dancehall Riddim & Bass Groove...] ♪" },
    ],
  },
  {
    id: 'praise-the-lord',
    title: 'Praise the Lord (Da Shine)',
    artist: 'A$AP Rocky ft. Skepta',
    year: '2018',
    album: 'TESTING (AWGE)',
    genre: 'Studio Master MP3 · AWGE Hip-Hop',
    src: '/audio/praise-the-lord.mp3',
    fallbackSrc: 'https://archive.org/download/asap-rocky-praise-the-lord/Asap%20Rocky%20-%20Praise%20the%20lord.mp3',
    cassetteColor: '#ffcc00',
    albumCover: '/albums/asap-rocky-testing.svg',
    duration: 205,
    isExplicit: true,
    edition: 'ORIGINAL 2018 AWGE MASTER',
    lyrics: [
      { time: 0, text: '♪ [Iconic Pan Flute Melody · Skepta AWGE Production...] ♪' },
      { time: 11, text: "★ A$AP ROCKY: 'I came, I saw, I came, I saw...' ★" },
      { time: 22, text: "★ 'I PRAISE THE LORD, THEN BREAK THE LAW!' ★" },
      { time: 34, text: "♪ 'I take what's mine, then take some more...' ♪" },
      { time: 45, text: "★ 'IT RAINS, IT POURS, IT RAINS, IT POURS!' ★" },
      { time: 65, text: "♪ SKEPTA: 'Yeah, I make the whole scene shake...' ♪" },
      { time: 90, text: "★ 'I PRAISE THE LORD, THEN BREAK THE LAW!' ★" },
      { time: 125, text: '♪ [Heavy 808 Sub-Bass, Pan Flute & AWGE Analog Vibes...] ♪' },
      { time: 160, text: "★ 'IT RAINS, IT POURS, IT RAINS, IT POURS!' ★" },
      { time: 195, text: '★ PRAISE THE LORD (DA SHINE) · AWGE MASTERPIECE ★' },
    ],
  },
];

type SoundProfile = 'studio' | 'bass-boost' | 'vinyl-warmth' | 'lo-fi';
type AudioSubscriber = () => void;

export class StudioMp3Engine {
  private audio: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  public analyser: AnalyserNode | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private biquadFilter: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private subscribers: Set<AudioSubscriber> = new Set();

  public isPlaying: boolean = false;
  public currentSongIndex: number = 0;
  public volume: number = 0.85;
  public isMuted: boolean = false;
  public currentTime: number = 0;
  public duration: number = 237;
  public lyric: string = JUKEBOX_SONGS[0].lyrics[0].text;
  public soundProfile: SoundProfile = 'studio';
  public bitDepth: string = '16-bit FLAC/MP3';
  public currentStep: number = 0; // backward compat

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (this.audio) return;
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.crossOrigin = 'anonymous';
    audio.src = this.currentSong.src;

    audio.addEventListener('timeupdate', () => {
      this.currentTime = audio.currentTime;
      if (audio.duration && !isNaN(audio.duration)) {
        this.duration = audio.duration;
      }
      this.updateLyric();
      this.notify();
    });

    audio.addEventListener('ended', () => {
      this.nextSong();
    });

    audio.addEventListener('error', () => {
      // If primary src fails and fallback is available, attempt fallback
      const song = this.currentSong;
      if (song.fallbackSrc && audio.src !== song.fallbackSrc) {
        console.warn(`[StudioAudio] Switching to fallback mirror for ${song.title}`);
        audio.src = song.fallbackSrc;
        if (this.isPlaying) {
          audio.play().catch(() => {});
        }
      }
    });

    this.audio = audio;
  }

  public get currentSong(): SongTrack {
    return JUKEBOX_SONGS[this.currentSongIndex] || JUKEBOX_SONGS[0];
  }

  public subscribe(fn: AudioSubscriber): () => void {
    this.subscribers.add(fn);
    return () => {
      this.subscribers.delete(fn);
    };
  }

  private notify() {
    this.subscribers.forEach((fn) => {
      try {
        fn();
      } catch {}
    });
  }

  private updateLyric() {
    const song = this.currentSong;
    const current = this.currentTime;
    const item = [...song.lyrics].reverse().find((l) => current >= l.time);
    if (item) {
      this.lyric = item.text;
    } else {
      this.lyric = song.lyrics[0].text;
    }
    this.currentStep = Math.floor((current / (this.duration || 1)) * 64);
  }

  public initWebAudio() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        try {
          const ctx = new AudioCtxClass();
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 64;
          analyser.smoothingTimeConstant = 0.8;

          const filter = ctx.createBiquadFilter();
          filter.type = 'allpass';

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, ctx.currentTime);

          if (this.audio) {
            try {
              const src = ctx.createMediaElementSource(this.audio);
              src.connect(filter);
              filter.connect(gain);
              gain.connect(analyser);
              analyser.connect(ctx.destination);
              this.sourceNode = src;
            } catch (err) {
              // On cross-origin streams without CORS header, mediaElementSource might throw.
              // Audio element still plays through default output, and analyser will run in mock mode.
              console.warn('[StudioAudio] Direct WebAudio pipe bypassed:', err);
            }
          }

          this.ctx = ctx;
          this.analyser = analyser;
          this.biquadFilter = filter;
          this.gainNode = gain;
        } catch (e) {
          console.warn('[StudioAudio] WebAudio init deferred:', e);
        }
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public play() {
    this.initAudioElement();
    this.initWebAudio();
    if (!this.audio) return;

    this.audio.volume = this.isMuted ? 0 : this.volume;
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.notify();
        })
        .catch((err) => {
          console.warn('[StudioAudio] Play prevented by browser autoplay policy:', err);
          this.isPlaying = false;
          this.notify();
        });
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.notify();
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public seek(seconds: number) {
    if (this.audio) {
      this.audio.currentTime = Math.max(0, Math.min(seconds, this.duration || 240));
      this.currentTime = this.audio.currentTime;
      this.updateLyric();
      this.notify();
    }
  }

  public setSong(songId: string) {
    const idx = JUKEBOX_SONGS.findIndex((s) => s.id === songId);
    if (idx !== -1) {
      const wasPlaying = this.isPlaying;
      this.currentSongIndex = idx;
      const song = JUKEBOX_SONGS[idx];
      this.currentTime = 0;
      this.duration = song.duration;
      this.lyric = song.lyrics[0].text;

      if (this.audio) {
        this.audio.src = song.src;
        this.audio.currentTime = 0;
        if (wasPlaying) {
          this.audio.play().then(() => {
            this.isPlaying = true;
            this.notify();
          }).catch(() => {
            this.isPlaying = false;
            this.notify();
          });
        } else {
          this.notify();
        }
      }
    }
  }

  public nextSong() {
    const nextIdx = (this.currentSongIndex + 1) % JUKEBOX_SONGS.length;
    this.setSong(JUKEBOX_SONGS[nextIdx].id);
  }

  public prevSong() {
    const prevIdx = (this.currentSongIndex - 1 + JUKEBOX_SONGS.length) % JUKEBOX_SONGS.length;
    this.setSong(JUKEBOX_SONGS[prevIdx].id);
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.audio) {
      this.audio.volume = muted ? 0 : this.volume;
    }
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(muted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  public setSoundProfile(profile: SoundProfile) {
    this.soundProfile = profile;
    if (this.biquadFilter && this.ctx) {
      if (profile === 'bass-boost') {
        this.biquadFilter.type = 'lowshelf';
        this.biquadFilter.frequency.setValueAtTime(140, this.ctx.currentTime);
        this.biquadFilter.gain.setValueAtTime(7, this.ctx.currentTime);
      } else if (profile === 'vinyl-warmth') {
        this.biquadFilter.type = 'peaking';
        this.biquadFilter.frequency.setValueAtTime(800, this.ctx.currentTime);
        this.biquadFilter.gain.setValueAtTime(4, this.ctx.currentTime);
        this.biquadFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);
      } else if (profile === 'lo-fi') {
        this.biquadFilter.type = 'lowpass';
        this.biquadFilter.frequency.setValueAtTime(3200, this.ctx.currentTime);
        this.biquadFilter.Q.setValueAtTime(2.0, this.ctx.currentTime);
      } else {
        // Flat Studio Master
        this.biquadFilter.type = 'allpass';
      }
    }
    this.notify();
  }

  // Backward compatibility methods
  public setBitDepth(depth: string) {
    this.bitDepth = depth;
    this.notify();
  }
}

// Global Singleton Instance
export const studioMp3Engine = new StudioMp3Engine();
// Backward compatibility aliases for seamless integration
export const chiptuneSynth = studioMp3Engine;
export const flashingLightsSynth = studioMp3Engine;
export const ChiptuneSynthesizer = StudioMp3Engine;
export const FlashingLightsSynthesizer = StudioMp3Engine;

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Vintage Reel-to-Reel Bobbin (Inspired by classic Studio Tape Recorders)
 * Features rotating 3-spoke metal flange, ventilation holes, central drive spindle,
 * and dynamic magnetic tape pack winding from supply spool to take-up spool.
 */
function BobbinReel({
  size = 100,
  isSpinning = false,
  tapePercent = 50,
}: {
  size?: number;
  isSpinning?: boolean;
  tapePercent?: number; // 0 (empty) to 100 (full)
}) {
  const minTapeR = size * 0.22;
  const maxTapeR = size * 0.44;
  const currentTapeR = minTapeR + (maxTapeR - minTapeR) * (tapePercent / 100);

  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      {/* Magnetic Tape Pack (Rich dark brown tape with concentric grooves) */}
      <div
        className="absolute rounded-full pointer-events-none transition-all duration-300"
        style={{
          width: currentTapeR * 2,
          height: currentTapeR * 2,
          background: 'radial-gradient(circle, #22140b 15%, #422817 65%, #180d07 100%)',
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.85), 0 0 4px rgba(0,0,0,0.6)',
          border: '1.5px solid #5a381e',
        }}
      >
        <div className="absolute inset-0 rounded-full opacity-35 border border-white/20 scale-75" />
        <div className="absolute inset-0 rounded-full opacity-25 border border-black/40 scale-50" />
      </div>

      {/* Rotating Studio Bobbin Flange & Cutout Spokes */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
        animate={{ rotate: isSpinning ? 360 : 0 }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          ease: 'linear',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
          <defs>
            <linearGradient id="bobbin-metal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5f5f7" />
              <stop offset="30%" stopColor="#c8cad0" />
              <stop offset="70%" stopColor="#878a92" />
              <stop offset="100%" stopColor="#4f5259" />
            </linearGradient>
            <radialGradient id="hub-metal" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#b4b7be" />
              <stop offset="100%" stopColor="#222428" />
            </radialGradient>
          </defs>

          {/* Outer Chrome Rim Flange */}
          <circle cx="50" cy="50" r="47" fill="none" stroke="url(#bobbin-metal)" strokeWidth="3" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="#111111" strokeWidth="1" opacity="0.6" />

          {/* 3 Main Teardrop/Triangular Cutout Spokes */}
          <g fill="none" stroke="url(#bobbin-metal)" strokeWidth="6.5" opacity="0.95">
            <line x1="50" y1="50" x2="50" y2="7" strokeLinecap="round" />
            <line x1="50" y1="50" x2="87.2" y2="71.5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="12.8" y2="71.5" strokeLinecap="round" />
          </g>

          {/* 6 Peripheral Weight-Reduction Drill Holes */}
          <g fill="#1a1b1e" stroke="#222" strokeWidth="0.8">
            <circle cx="50" cy="21" r="3.5" />
            <circle cx="75" cy="35" r="3.5" />
            <circle cx="75" cy="65" r="3.5" />
            <circle cx="50" cy="79" r="3.5" />
            <circle cx="25" cy="65" r="3.5" />
            <circle cx="25" cy="35" r="3.5" />
          </g>

          {/* Middle Reinforcement Ring */}
          <circle cx="50" cy="50" r="31" fill="none" stroke="url(#bobbin-metal)" strokeWidth="1.8" opacity="0.85" />

          {/* Central Spindle Hub */}
          <circle cx="50" cy="50" r="14" fill="url(#hub-metal)" stroke="#111" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="8" fill="#111111" stroke="#333" strokeWidth="1" />

          {/* 3 Drive Spline Teeth */}
          <rect x="48" y="38" width="4" height="6" fill="#f0f0f2" rx="0.5" />
          <rect x="48" y="38" width="4" height="6" fill="#f0f0f2" rx="0.5" transform="rotate(120 50 50)" />
          <rect x="48" y="38" width="4" height="6" fill="#f0f0f2" rx="0.5" transform="rotate(240 50 50)" />

          {/* Center Axle Hole */}
          <circle cx="50" cy="50" r="3.5" fill="#000000" />
        </svg>
      </motion.div>
    </div>
  );
}

/**
 * Dual Illuminated Vintage Analog VU Meter
 */
function AnalogVuMeter({
  label,
  active,
  currentTime,
}: {
  label: string;
  active: boolean;
  currentTime: number;
}) {
  const offset = label === 'CH-L' ? 0 : 0.45;
  const needleDeg = active
    ? -18 + Math.sin((currentTime + offset) * 7.5) * 20 + Math.sin((currentTime + offset) * 19) * 7
    : -36;
  const isPeaking = active && needleDeg > 5;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 sm:w-20 h-10 sm:h-12 rounded border-2 border-black bg-gradient-to-b from-[#ffe57f] via-[#ffd166] to-[#f4a261] p-1 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex flex-col justify-between select-none">
        {/* Warm Meter Backlight glow */}
        <div className="absolute inset-0 bg-yellow-300/30 pointer-events-none" />

        {/* Dial Scale */}
        <div className="relative z-1 flex justify-between items-start text-[6px] sm:text-[7px] font-black text-black font-mono leading-none pt-0.5">
          <span className="text-black/80">-20</span>
          <span className="text-black/80">-7</span>
          <span className="text-black/90">0</span>
          <span className="text-red-700 font-black">+3</span>
        </div>

        {/* Dial Arc */}
        <svg viewBox="0 0 80 40" className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M12,28 Q40,12 68,28" fill="none" stroke="#222" strokeWidth="0.8" opacity="0.6" />
          <path d="M52,18 Q60,22 68,28" fill="none" stroke="#d90429" strokeWidth="1.8" />
        </svg>

        {/* Dynamic Needle */}
        <div
          className="absolute bottom-[-4px] left-1/2 w-0.5 h-8 sm:h-9 bg-black origin-bottom transition-transform duration-100 ease-out"
          style={{
            transform: `translateX(-50%) rotate(${needleDeg}deg)`,
            boxShadow: '0 0 2px rgba(0,0,0,0.8)',
          }}
        >
          <div className="w-1 h-1 bg-red-600 rounded-full -ml-0.25 -mt-0.5" />
        </div>

        {/* Meter Bottom Label */}
        <div className="relative z-2 self-center flex items-center justify-between w-full mt-auto text-[6.5px] sm:text-[7.5px] font-mono font-black text-black">
          <span>VU</span>
          <span className="text-[6px] tracking-tighter text-black/70">{label}</span>
          <span className={isPeaking ? 'text-red-600 font-black animate-pulse' : 'text-black/40'}>PEAK</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Vintage 3-Digit Mechanical Tape Counter
 */
function TapeIndexCounter({
  currentTime,
  onReset,
}: {
  currentTime: number;
  onReset: () => void;
}) {
  const counterVal = Math.floor(currentTime * 1.6) % 1000;
  const digits = counterVal.toString().padStart(3, '0').split('');

  return (
    <div className="flex items-center gap-1.5 bg-[#101114] px-2 py-1 rounded border-2 border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-0.5">
        {digits.map((digit, idx) => (
          <div
            key={idx}
            className="w-4 sm:w-4.5 h-6 sm:h-7 bg-[#1c1d21] border border-black rounded-xs flex items-center justify-center font-mono font-black text-white text-xs sm:text-sm shadow-inner relative overflow-hidden"
          >
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/60 pointer-events-none" />
            <span className="relative z-1">{digit}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onReset}
        title="Reset Tape Counter"
        className="w-4 h-4 rounded-full border border-black bg-neutral-700 hover:bg-neutral-600 active:scale-95 text-[7px] font-bold flex items-center justify-center cursor-pointer shadow-xs"
      >
        R
      </button>
      <span className="text-[7.5px] font-mono font-bold text-neutral-400 uppercase tracking-tighter hidden xs:inline">INDEX</span>
    </div>
  );
}

export function StudioTapePlayer() {
  const [isPlaying, setIsPlaying] = useState(studioMp3Engine.isPlaying);
  const [currentTime, setCurrentTime] = useState(studioMp3Engine.currentTime);
  const [duration, setDuration] = useState(studioMp3Engine.duration);
  const [volume, setVolume] = useState(studioMp3Engine.volume);
  const [isMuted, setIsMuted] = useState(studioMp3Engine.isMuted);
  const [soundProfile, setSoundProfile] = useState<SoundProfile>(studioMp3Engine.soundProfile);
  const [lyric, setLyric] = useState(studioMp3Engine.lyric);
  const [currentSong, setCurrentSong] = useState<SongTrack>(studioMp3Engine.currentSong);

  // Cassette physical state (loading / eject transition)
  const [isEjected, setIsEjected] = useState(false);
  const [tapeInsertKey, setTapeInsertKey] = useState(0);

  const prevSongIdRef = useRef(currentSong.id);
  useEffect(() => {
    if (prevSongIdRef.current !== currentSong.id) {
      prevSongIdRef.current = currentSong.id;
      setTapeInsertKey((k) => k + 1);
      setIsEjected(false);
      try {
        retroAudio.click();
      } catch {}
    }
  }, [currentSong.id]);

  const handleToggleEject = () => {
    try {
      retroAudio.click();
    } catch {}
    setIsEjected((prev) => !prev);
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const unsub = studioMp3Engine.subscribe(() => {
      setIsPlaying(studioMp3Engine.isPlaying);
      setCurrentTime(studioMp3Engine.currentTime);
      setDuration(studioMp3Engine.duration);
      setVolume(studioMp3Engine.volume);
      setIsMuted(studioMp3Engine.isMuted);
      setSoundProfile(studioMp3Engine.soundProfile);
      setLyric(studioMp3Engine.lyric);
      setCurrentSong(studioMp3Engine.currentSong);
    });
    return unsub;
  }, []);

  // Real-time Canvas Spectrum Visualizer (60 FPS animated with audio frequencies)
  useEffect(() => {
    let animFrame: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barCount = 16;
      const barWidth = canvas.width / barCount;

      if (isPlaying && !isMuted) {
        let dataArray: Uint8Array | null = null;
        if (studioMp3Engine.analyser) {
          const bufferLength = studioMp3Engine.analyser.frequencyBinCount;
          dataArray = new Uint8Array(bufferLength);
          studioMp3Engine.analyser.getByteFrequencyData(dataArray as any);
        }

        phase += 0.08;

        for (let i = 0; i < barCount; i++) {
          let val = 0;
          if (dataArray && dataArray[i * 2] > 0) {
            val = dataArray[i * 2];
          } else {
            // Organic simulated beat frequency for cross-origin streams
            const wave = Math.sin(phase + i * 0.4) * 0.5 + 0.5;
            const beat = (Math.sin(phase * 2) > 0.4 ? 0.4 : 0.1);
            val = Math.floor((wave * 0.6 + beat) * 230);
          }

          const barHeight = Math.max(3, (val / 255) * canvas.height);

          // Retro Macintosh Tri-color LED Segments
          if (val > 195) {
            ctx.fillStyle = '#ef476f'; // Red peak limiter
          } else if (val > 130) {
            ctx.fillStyle = '#ffd166'; // Yellow high-mid
          } else {
            ctx.fillStyle = '#d8ee57'; // Lime green base
          }

          ctx.fillRect(
            i * barWidth + 1,
            canvas.height - barHeight,
            barWidth - 2,
            barHeight
          );
        }
      } else {
        // Idle Standby Mode: Subtle Macintosh phosphor markers
        ctx.fillStyle = '#2a2a2a';
        for (let i = 0; i < barCount; i++) {
          ctx.fillRect(i * barWidth + 1, canvas.height - 3, barWidth - 2, 3);
        }
      }

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, [isPlaying, isMuted]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col gap-3 font-mono text-[#111111] select-none">
      {/* Top Header: Track Metadata & Track Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b-2 border-black pb-2.5">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded border-2 border-black bg-[#d8ee57] shadow-[2px_2px_0px_#000]">
            <Music size={18} className="text-black" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-nowrap">
              <h3 className="font-mono text-xs sm:text-base font-black uppercase tracking-tight text-black truncate">
                {currentSong.title}
              </h3>
              {currentSong.isExplicit && (
                <span
                  title="Parental Advisory: Explicit Lyrics"
                  className="rounded-xs bg-black text-white px-1 py-0.2 font-mono text-[7.5px] sm:text-[8.5px] font-black shrink-0 tracking-tight"
                >
                  E
                </span>
              )}
              <span className="rounded bg-black text-[#d8ee57] px-1.5 py-0.2 text-[8px] sm:text-[8.5px] font-bold shrink-0">
                {currentSong.year}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 flex-nowrap text-[9.5px] sm:text-[11px] text-black/80 font-bold truncate">
              <span className="truncate">{currentSong.artist} · {currentSong.album}</span>
              <span className="rounded bg-emerald-700 text-white px-1 py-0.2 text-[7px] sm:text-[7.5px] font-bold uppercase tracking-wider shrink-0">
                ORIGINAL MP3
              </span>
              {currentSong.isExplicit && (
                <span className="rounded bg-black text-[#ff4d6d] border border-black/30 px-1 py-0.2 text-[6.5px] sm:text-[7.5px] font-black uppercase tracking-wider shrink-0">
                  EXPLICIT
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Track Navigation Dropdown */}
        <div className="flex items-center gap-1 self-stretch sm:self-auto justify-between sm:justify-start shrink-0">
          <button
            type="button"
            onClick={() => {
              retroAudio.click();
              studioMp3Engine.prevSong();
            }}
            title="Previous Track"
            className="flex items-center justify-center rounded border-2 border-black bg-white hover:bg-black hover:text-white p-1 sm:p-1.5 cursor-pointer shadow-[2px_2px_0px_#000] shrink-0"
          >
            <SkipBack size={12} strokeWidth={2.5} />
          </button>

          <select
            value={currentSong.id}
            onChange={(e) => {
              retroAudio.click();
              studioMp3Engine.setSong(e.target.value);
            }}
            className="flex-1 sm:flex-initial rounded border-2 border-black bg-white px-2 py-1 text-[10px] sm:text-[11px] font-bold text-black cursor-pointer shadow-[2px_2px_0px_#000] focus:outline-none max-w-[210px] sm:max-w-[340px] md:max-w-[420px] truncate"
          >
            {JUKEBOX_SONGS.map((song, idx) => (
              <option key={song.id} value={song.id}>
                {idx + 1}. {song.artist} — {song.title} {song.isExplicit ? '[EXPLICIT]' : ''}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              retroAudio.click();
              studioMp3Engine.nextSong();
            }}
            title="Next Track"
            className="flex items-center justify-center rounded border-2 border-black bg-white hover:bg-black hover:text-white p-1 sm:p-1.5 cursor-pointer shadow-[2px_2px_0px_#000] shrink-0"
          >
            <SkipForward size={12} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Studio Showcase: Full-Width Vintage Bobbin Reel-to-Reel Tape Recorder & Deck */}
      <div className="relative rounded-md border-3 sm:border-4 border-black bg-gradient-to-b from-[#1c1d22] via-[#25272e] to-[#16171b] p-3 sm:p-4 text-white shadow-[5px_5px_0px_#000000] w-full my-1 flex flex-col gap-2.5 sm:gap-3 select-none">
        {/* Chassis Corner Hardware Hex Screws */}
        <div className="absolute top-2 left-2 h-2 w-2 rounded-full border border-black bg-neutral-400 flex items-center justify-center text-[7px] text-black font-black leading-none">+</div>
        <div className="absolute top-2 right-2 h-2 w-2 rounded-full border border-black bg-neutral-400 flex items-center justify-center text-[7px] text-black font-black leading-none">+</div>
        <div className="absolute bottom-2 left-2 h-2 w-2 rounded-full border border-black bg-neutral-400 flex items-center justify-center text-[7px] text-black font-black leading-none">+</div>
        <div className="absolute bottom-2 right-2 h-2 w-2 rounded-full border border-black bg-neutral-400 flex items-center justify-center text-[7px] text-black font-black leading-none">+</div>

        {/* 1. Top Deck Dashboard: Brand, Index Counter, Status LEDs, Dual VU Meters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 border-b-2 border-black/50 pb-2.5 px-1">
          {/* Deck Badge & Status Indicators */}
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] sm:text-[10px] font-black tracking-widest text-[#d8ee57] uppercase">
                HARIS-TONE PRO-DECK · BR-808
              </span>
              <span className="rounded bg-white/10 border border-white/20 px-1 py-0.2 text-[7px] sm:text-[7.5px] font-mono text-neutral-300">
                STUDIO REEL CASSETTE
              </span>
            </div>
            {/* Status LEDs */}
            <div className="flex items-center gap-3 text-[7.5px] sm:text-[8px] font-mono font-bold text-neutral-400">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_4px_#fbbf24]" />
                <span>POWER</span>
              </span>
              <span className="flex items-center gap-1">
                <span className={`h-1.5 w-1.5 rounded-full ${!isEjected ? 'bg-cyan-400 shadow-[0_0_4px_#22d3ee]' : 'bg-red-500 animate-pulse'}`} />
                <span>{!isEjected ? 'TAPE LOADED' : 'TAPE EJECTED'}</span>
              </span>
              <span className="flex items-center gap-1">
                <span className={`h-1.5 w-1.5 rounded-full ${isPlaying && !isEjected ? 'bg-emerald-400 animate-ping' : 'bg-neutral-600'}`} />
                <span>{isPlaying && !isEjected ? 'MOTOR: RUNNING' : 'MOTOR: IDLE'}</span>
              </span>
              <span className="flex items-center gap-1 hidden xs:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/80" />
                <span>DOLBY B-NR</span>
              </span>
            </div>
          </div>

          {/* Center/Right Dashboard: 3-Digit Counter & Dual Vintage VU Meters */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            <TapeIndexCounter
              currentTime={currentTime}
              onReset={() => {
                try { retroAudio.click(); } catch {}
                studioMp3Engine.seek(0);
              }}
            />
            <div className="flex items-center gap-1.5 bg-[#121316] p-1 rounded border-2 border-black">
              <AnalogVuMeter label="CH-L" active={isPlaying && !isEjected} currentTime={currentTime} />
              <AnalogVuMeter label="CH-R" active={isPlaying && !isEjected} currentTime={currentTime} />
            </div>
          </div>
        </div>

        {/* 2. Main Cassette Well Chamber (Animated Tape Insertion / Ejection) */}
        <div className="relative rounded border-3 border-black bg-[#0d0e11] p-2 sm:p-3 min-h-[175px] sm:min-h-[195px] flex flex-col justify-center overflow-hidden shadow-[inset_0_3px_8px_rgba(0,0,0,0.9)]">
          {/* Internal Chamber Depth Gradient & Guide Rails */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-1 bg-neutral-700/50" />
          <div className="absolute bottom-0 inset-x-0 h-1.5 bg-neutral-800" />
          <div className="absolute left-1 top-4 bottom-4 w-1 rounded bg-neutral-700/60" />
          <div className="absolute right-1 top-4 bottom-4 w-1 rounded bg-neutral-700/60" />

          <AnimatePresence mode="wait">
            {!isEjected ? (
              /* Loaded Cassette Tape Container */
              <motion.div
                key={`tape-${currentSong.id}-${tapeInsertKey}`}
                initial={{ y: -80, opacity: 0, scale: 0.96, rotateX: 14 }}
                animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ y: -90, opacity: 0, scale: 1.04, rotateX: -12 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                  mass: 0.85,
                }}
                className="relative rounded-md border-3 border-black p-2 sm:p-2.5 text-black transition-colors w-full shadow-[0_4px_12px_rgba(0,0,0,0.8)] z-1"
                style={{ backgroundColor: currentSong.cassetteColor }}
              >
                {/* Cassette Shell Corner Rivets */}
                <div className="absolute top-1.5 left-1.5 h-1.5 w-1.5 rounded-full border border-black bg-neutral-300" />
                <div className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full border border-black bg-neutral-300" />
                <div className="absolute bottom-1.5 left-1.5 h-1.5 w-1.5 rounded-full border border-black bg-neutral-300" />
                <div className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full border border-black bg-neutral-300" />

                {/* Cassette Vintage Top Label Band */}
                <div className="flex items-center justify-between gap-1.5 border-b border-black/35 pb-1 text-[8.5px] sm:text-[9.5px] font-bold">
                  <div className="flex items-center gap-1.5 shrink min-w-0">
                    <Radio size={12} className="shrink-0 text-black" />
                    <span className="truncate font-mono tracking-tight text-[8.5px] sm:text-[9.5px]">MOCKINTOSH TDK-90</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 whitespace-nowrap">
                    {currentSong.isExplicit && (
                      <span className="rounded bg-black text-[#ff4d6d] px-1 py-0.5 font-mono text-[7px] sm:text-[7.5px] font-black border border-black flex items-center gap-0.5 shrink-0 leading-none shadow-xs">
                        <span className="bg-[#ff4d6d] text-black px-0.5 text-[5.5px] font-black rounded-2xs leading-none">E</span>
                        EXPLICIT
                      </span>
                    )}
                    <span className="rounded bg-black text-[#d8ee57] px-1.5 py-0.5 font-mono text-[7px] sm:text-[8px] font-bold border border-black shrink-0 leading-none shadow-xs">
                      {currentSong.edition?.includes('UNRATED') || currentSong.edition?.includes('UNCENSORED') ? 'UNRATED' : 'ORIGINAL'}
                    </span>
                    <span className="rounded bg-white text-black px-1 py-0.5 font-mono text-[7px] sm:text-[8px] font-bold border border-black shrink-0 leading-none shadow-xs">
                      {soundProfile.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Track Details Subheader */}
                <div className="mt-1 flex items-baseline justify-between border-b border-black/20 pb-1">
                  <h4 className="font-mono text-xs sm:text-sm font-black tracking-tight truncate max-w-[280px] sm:max-w-none text-black">
                    SIDE A: {currentSong.artist} — "{currentSong.title}"
                  </h4>
                  <span className="text-[8.5px] sm:text-[9.5px] font-mono font-bold opacity-80 shrink-0 ml-1.5">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Central Bobbin Chamber Window with Dual Reels & 16-Band Visualizer */}
                <div className="relative mt-1.5 rounded border-2 border-black bg-[#111215] p-2 sm:p-2.5 overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)] flex items-center justify-between gap-2">
                  {/* Left Supply Bobbin Reel (Thins as song progresses) */}
                  <div className="flex flex-col items-center">
                    <BobbinReel
                      size={window.innerWidth < 640 ? 76 : 94}
                      isSpinning={isPlaying && !isEjected}
                      tapePercent={Math.max(12, 100 - progressPercent)}
                    />
                    <span className="text-[7px] font-mono font-bold text-neutral-400 mt-0.5">SUPPLY A</span>
                  </div>

                  {/* Center Audio Spectrum Visualizer & Tape Bridge Mechanism */}
                  <div className="flex flex-1 flex-col items-center justify-center px-1 sm:px-2 z-1 min-w-0">
                    {/* Visualizer Canvas framed in chrome window */}
                    <div className="relative w-full max-w-[220px] rounded border border-black/60 bg-black/85 p-1 shadow-inner flex flex-col items-center">
                      <canvas
                        ref={canvasRef}
                        width={200}
                        height={30}
                        className="h-6 sm:h-8 w-full rounded"
                      />
                      <div className="w-full flex items-center justify-between text-[6.5px] sm:text-[7.5px] font-mono font-bold text-neutral-400 px-0.5 mt-0.5">
                        <span className="text-[#d8ee57]">16-BAND DSP</span>
                        <span className={isPlaying ? 'text-emerald-400 animate-pulse' : 'text-neutral-500'}>
                          {isPlaying ? '● REALTIME 60FPS' : '❚❚ STANDBY'}
                        </span>
                      </div>
                    </div>

                    {/* Tape Head Bridge & Mechanical Rollers underneath */}
                    <div className="mt-1 flex items-center justify-center gap-3 text-neutral-400">
                      {/* Left Guide Pin */}
                      <div className="h-2 w-2 rounded-full border border-black bg-neutral-300 shadow-xs" />
                      {/* Magnetic Playback Head */}
                      <div className="h-3 w-8 rounded-xs border border-black bg-neutral-700 flex items-center justify-center shadow-xs">
                        <div className="h-1 w-4 bg-neutral-900 rounded-2xs" />
                      </div>
                      {/* Right Guide Pin & Pinch Roller */}
                      <div className="h-2 w-2 rounded-full border border-black bg-neutral-300 shadow-xs" />
                    </div>

                    {/* Magnetic Brown Tape Thread Path */}
                    <div className="mt-0.5 h-1 w-full max-w-[210px] bg-gradient-to-r from-[#5a381e] via-[#3a200f] to-[#5a381e] border-y border-black/60 shadow-xs opacity-90" />
                  </div>

                  {/* Right Takeup Bobbin Reel (Thickens as song progresses) */}
                  <div className="flex flex-col items-center">
                    <BobbinReel
                      size={window.innerWidth < 640 ? 76 : 94}
                      isSpinning={isPlaying && !isEjected}
                      tapePercent={Math.min(92, progressPercent + 12)}
                    />
                    <span className="text-[7px] font-mono font-bold text-neutral-400 mt-0.5">TAKEUP B</span>
                  </div>

                  {/* Clear Acrylic Window Diagonal Glass Sheen Reflection */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-75" />
                </div>

                {/* Cassette Lower Footer: Tape Type & Parental Advisory */}
                <div className="mt-1.5 flex items-center justify-between text-[7.5px] sm:text-[8.5px] font-mono font-bold px-0.5 text-black/80">
                  <span className="rounded bg-black/10 px-1 py-0.2 border border-black/20">
                    TYPE II (CrO2) HIGH BIAS · 70µs EQ
                  </span>
                  <span className="rounded bg-black text-white px-1 py-0.2 text-[7px] font-mono font-black">
                    NR DOLBY SYSTEM
                  </span>
                </div>
              </motion.div>
            ) : (
              /* Ejected State: Empty Bay Compartment */
              <motion.div
                key="ejected-bay"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-neutral-600 rounded bg-black/40 z-1"
              >
                <div className="flex items-center gap-8 mb-3 opacity-60">
                  <div className="h-10 w-10 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-neutral-600" />
                  </div>
                  <div className="h-4 w-12 rounded bg-neutral-700 border border-black" />
                  <div className="h-10 w-10 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-neutral-600" />
                  </div>
                </div>
                <p className="font-mono text-xs sm:text-sm font-black text-[#ffd166] uppercase tracking-wider">
                  ⏏ CASSETTE TAPE EJECTED
                </p>
                <p className="font-mono text-[9px] sm:text-[10px] text-neutral-400 mt-1 max-w-[280px]">
                  Click the button below or choose a song from the tracklist to load the cassette into the drive.
                </p>
                <button
                  type="button"
                  onClick={handleToggleEject}
                  className="mt-3 rounded border-2 border-black bg-[#d8ee57] hover:bg-[#cbe348] text-black font-mono text-xs font-black px-4 py-1.5 shadow-[2px_2px_0px_#000] cursor-pointer"
                >
                  INSERT TAPE NOW ↵
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. Deck Control Console: Transport Keys, Eject, Scrubber Slider */}
        <div className="flex flex-col gap-2 pt-1 border-t border-black/40">
          {/* Tactile Piano-Key Style Deck Transport Buttons */}
          <div className="flex items-center justify-between gap-1 sm:gap-2 flex-wrap sm:flex-nowrap">
            {/* Eject / Load Key */}
            <button
              type="button"
              onClick={handleToggleEject}
              title={isEjected ? 'Load Cassette Tape into Deck' : 'Eject Cassette Tape'}
              className={`flex items-center gap-1.5 rounded border-2 border-black px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-[10px] sm:text-[11px] font-black cursor-pointer shadow-[2px_2px_0px_#000] transition-colors shrink-0 ${
                isEjected
                  ? 'bg-[#ffd166] text-black hover:bg-[#eec054]'
                  : 'bg-neutral-800 text-white hover:bg-neutral-700'
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,5 4,14 20,14" />
                <rect x="4" y="17" width="16" height="2.5" />
              </svg>
              <span>{isEjected ? 'LOAD TAPE' : 'EJECT'}</span>
            </button>

            {/* Transport Cluster: Prev, Rewind 10s, Play/Pause, Fwd 10s, Next */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                type="button"
                onClick={() => {
                  try { retroAudio.click(); } catch {}
                  studioMp3Engine.prevSong();
                }}
                title="Previous Cassette"
                className="flex items-center justify-center rounded border-2 border-black bg-white hover:bg-black hover:text-white p-1 sm:p-1.5 text-black cursor-pointer shadow-[2px_2px_0px_#000]"
              >
                <SkipBack size={12} strokeWidth={2.5} />
              </button>

              <button
                type="button"
                onClick={() => {
                  try { retroAudio.click(); } catch {}
                  studioMp3Engine.seek(Math.max(0, currentTime - 10));
                }}
                title="Rewind 10 Seconds"
                className="flex items-center gap-0.5 rounded border-2 border-black bg-neutral-800 hover:bg-black p-1 sm:p-1.5 text-white cursor-pointer shadow-[2px_2px_0px_#000] text-[9px] font-mono font-bold"
              >
                <Rewind size={11} />
                <span className="hidden xs:inline">10s</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  try { retroAudio.click(); } catch {}
                  if (isEjected) setIsEjected(false);
                  studioMp3Engine.toggle();
                }}
                className={`flex items-center gap-1.5 rounded border-2 border-black px-3 sm:px-4 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs font-black cursor-pointer transition-colors shadow-[2px_2px_0px_#000] ${
                  isPlaying && !isEjected
                    ? 'bg-[#ef476f] text-white hover:bg-[#d63056]'
                    : 'bg-[#d8ee57] text-black hover:bg-[#cbe348]'
                }`}
              >
                {isPlaying && !isEjected ? <Pause size={12} strokeWidth={3} /> : <Play size={12} strokeWidth={3} />}
                <span>{isPlaying && !isEjected ? 'PAUSE' : 'PLAY'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  try { retroAudio.click(); } catch {}
                  studioMp3Engine.seek(Math.min(duration, currentTime + 10));
                }}
                title="Fast Forward 10 Seconds"
                className="flex items-center gap-0.5 rounded border-2 border-black bg-neutral-800 hover:bg-black p-1 sm:p-1.5 text-white cursor-pointer shadow-[2px_2px_0px_#000] text-[9px] font-mono font-bold"
              >
                <span className="hidden xs:inline">10s</span>
                <FastForward size={11} />
              </button>

              <button
                type="button"
                onClick={() => {
                  try { retroAudio.click(); } catch {}
                  studioMp3Engine.nextSong();
                }}
                title="Next Cassette"
                className="flex items-center justify-center rounded border-2 border-black bg-white hover:bg-black hover:text-white p-1 sm:p-1.5 text-black cursor-pointer shadow-[2px_2px_0px_#000]"
              >
                <SkipForward size={12} strokeWidth={2.5} />
              </button>
            </div>

            {/* Replay Track */}
            <button
              type="button"
              onClick={() => {
                try { retroAudio.click(); } catch {}
                studioMp3Engine.seek(0);
              }}
              title="Restart from Beginning"
              className="flex items-center justify-center rounded border-2 border-black bg-white hover:bg-black hover:text-white p-1 sm:p-1.5 text-black cursor-pointer shadow-[2px_2px_0px_#000]"
            >
              <RotateCcw size={12} />
            </button>
          </div>

          {/* Interactive Tape Scrubber Bar */}
          <div className="space-y-0.5 mt-1">
            <div className="flex items-center justify-between text-[8.5px] sm:text-[9.5px] font-bold text-neutral-300">
              <span className="font-mono">{formatTime(currentTime)}</span>
              <span className="text-[#d8ee57] uppercase text-[7.5px] sm:text-[8.5px] tracking-wider font-mono">
                {isEjected ? '⏏ DECK EJECTED' : isPlaying ? '● TAPE RUNNING' : '❚❚ PAUSED'}
              </span>
              <span className="font-mono">{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={duration || 240}
              step={0.5}
              value={currentTime}
              onChange={(e) => {
                studioMp3Engine.seek(parseFloat(e.target.value));
              }}
              style={{ touchAction: 'none' }}
              className="w-full h-1.5 sm:h-2 rounded-xs appearance-none bg-neutral-900 cursor-pointer accent-[#d8ee57]"
            />
          </div>
        </div>
      </div>

      {/* Synchronized Studio Lyrics / Liner Notes Ticker */}
      <div className="rounded border-2 border-black bg-black p-2 sm:p-2.5 text-center text-[#d8ee57] shadow-[2px_2px_0px_#000]">
        <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-bold text-neutral-400 mb-0.5">
          <span>SYNCHRONIZED STUDIO LYRICS:</span>
          <span>{Math.round(progressPercent)}% COMPLETE</span>
        </div>
        <div className="font-mono text-[11px] sm:text-sm font-bold tracking-wide truncate">
          {lyric}
        </div>
        <div className="mt-1 h-1.5 w-full rounded-xs border border-white/30 bg-neutral-900 overflow-hidden">
          <div
            className="h-full bg-[#d8ee57] transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Transport & Studio Equalizer Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-black/20 text-xs font-bold">
        {/* Play/Pause & Mute Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap">
          <button
            type="button"
            onClick={() => {
              retroAudio.click();
              studioMp3Engine.toggle();
            }}
            className={`flex items-center gap-1.5 rounded border-2 border-black px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-bold cursor-pointer transition-colors shadow-[2px_2px_0px_#000] ${
              isPlaying
                ? 'bg-[#ef476f] text-white hover:bg-[#d63056]'
                : 'bg-[#d8ee57] text-black hover:bg-[#cbe348]'
            }`}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'PAUSE' : `PLAY ${currentSong.title.toUpperCase()}`}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              retroAudio.click();
              studioMp3Engine.setMuted(!isMuted);
            }}
            className="flex items-center justify-center rounded border-2 border-black bg-white p-1.5 sm:p-2 text-black hover:bg-black hover:text-white cursor-pointer shadow-[2px_2px_0px_#000]"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>

          <button
            type="button"
            onClick={() => {
              retroAudio.click();
              studioMp3Engine.seek(0);
            }}
            className="flex items-center justify-center rounded border-2 border-black bg-white p-1.5 sm:p-2 text-black hover:bg-black hover:text-white cursor-pointer shadow-[2px_2px_0px_#000]"
            title="Replay Track from Beginning"
          >
            <RotateCcw size={13} />
          </button>
        </div>

        {/* Studio EQ Profiles */}
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-[9px] sm:text-[10px] text-black/70 mr-0.5 flex items-center gap-1">
            <Sliders size={10} /> EQ:
          </span>
          {(['studio', 'bass-boost', 'vinyl-warmth', 'lo-fi'] as const).map((profile) => (
            <button
              key={profile}
              type="button"
              onClick={() => {
                retroAudio.click();
                studioMp3Engine.setSoundProfile(profile);
              }}
              className={`rounded border border-black px-1.5 sm:px-2 py-0.5 sm:py-1 text-[8.5px] sm:text-[10px] font-bold uppercase cursor-pointer ${
                soundProfile === profile
                  ? 'bg-black text-[#d8ee57] shadow-[1px_1px_0px_#000]'
                  : 'bg-white text-black hover:bg-black/10'
              }`}
            >
              {profile === 'studio' ? 'STUDIO' : profile === 'bass-boost' ? 'BASS+' : profile === 'vinyl-warmth' ? 'VINYL' : 'LO-FI'}
            </button>
          ))}
        </div>

        {/* Volume Fader Slider */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-black/70">VOL</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              studioMp3Engine.setVolume(parseFloat(e.target.value));
              if (isMuted) studioMp3Engine.setMuted(false);
            }}
            className="w-18 sm:w-20 cursor-pointer accent-black"
          />
        </div>
      </div>
    </div>
  );
}

// Backward compatibility alias for existing imports in App.tsx and retro-os.tsx
export const ChiptunePlayer = StudioTapePlayer;
export const FlashingLightsPlayer = StudioTapePlayer;
