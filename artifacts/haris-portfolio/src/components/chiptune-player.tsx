import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  SkipBack,
  SkipForward,
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

export function StudioTapePlayer() {
  const [isPlaying, setIsPlaying] = useState(studioMp3Engine.isPlaying);
  const [currentTime, setCurrentTime] = useState(studioMp3Engine.currentTime);
  const [duration, setDuration] = useState(studioMp3Engine.duration);
  const [volume, setVolume] = useState(studioMp3Engine.volume);
  const [isMuted, setIsMuted] = useState(studioMp3Engine.isMuted);
  const [soundProfile, setSoundProfile] = useState<SoundProfile>(studioMp3Engine.soundProfile);
  const [lyric, setLyric] = useState(studioMp3Engine.lyric);
  const [currentSong, setCurrentSong] = useState<SongTrack>(studioMp3Engine.currentSong);

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

      {/* Studio Showcase: Album Art Display Card + Minimal Tactile Cassette Tape */}
      <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-3 sm:gap-4 my-1 w-full">
        {/* Vinyl / CD Album Artwork Display Sleeve */}
        <div className="flex flex-row md:flex-col items-center gap-3 rounded border-3 border-black bg-[#151515] p-2.5 sm:p-3 text-white shadow-[4px_4px_0px_#000] shrink-0 w-full md:w-[170px] justify-center">
          <div className="relative group shrink-0">
            {/* CD Jewel Case / Vinyl Cover Container */}
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-36 md:w-36 overflow-hidden rounded border-2 border-black bg-black shadow-[2px_2px_0px_rgba(255,255,255,0.25)]">
              <img
                src={currentSong.albumCover}
                alt={`${currentSong.artist} - ${currentSong.album}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="eager"
              />
              {/* Vinyl Groove Sheen Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20 opacity-60" />
            </div>
            {/* Subtle Vinyl Grooved Edge Peeking on Desktop */}
            <div className="hidden md:block absolute -right-2 top-2 bottom-2 w-3 rounded-r-full bg-[#111] border border-white/20 -z-1 opacity-75" />
          </div>

          {/* Album Metadata & Badges */}
          <div className="min-w-0 flex-1 md:w-full md:text-center">
            <div className="flex items-center md:justify-center gap-1 flex-wrap">
              <span className="rounded bg-[#d8ee57] text-black px-1.5 py-0.2 font-mono text-[7px] sm:text-[7.5px] font-black uppercase">
                ALBUM COVER
              </span>
              {currentSong.isExplicit && (
                <span className="rounded bg-[#ef476f] text-white px-1 py-0.2 font-mono text-[6.5px] sm:text-[7px] font-black uppercase">
                  EXPLICIT
                </span>
              )}
            </div>
            <h4 className="mt-1 font-mono text-xs sm:text-sm font-black text-white truncate max-w-[190px] md:max-w-none">
              {currentSong.album}
            </h4>
            <p className="font-mono text-[9.5px] sm:text-[10px] text-neutral-400 font-bold truncate">
              {currentSong.artist}
            </p>
            <div className="mt-0.5 text-[8px] sm:text-[8.5px] text-[#ffd166] font-mono truncate">
              ★ {currentSong.year} · {currentSong.edition || 'STUDIO MASTER'}
            </div>
          </div>
        </div>

        {/* Minimal Width Cassette Tape Housing Visualizer (Proportionate, realistic, never stretched) */}
        <div className="relative rounded border-4 border-black bg-[#222222] p-2.5 sm:p-3 text-white shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] w-full max-w-[390px] sm:max-w-[430px] flex flex-col justify-between">
          {/* Cassette Corner Screw Accents */}
          <div className="absolute top-1.5 left-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full border border-black bg-neutral-400" />
          <div className="absolute top-1.5 right-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full border border-black bg-neutral-400" />
          <div className="absolute bottom-1.5 left-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full border border-black bg-neutral-400" />
          <div className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full border border-black bg-neutral-400" />

          {/* Vintage Cassette Tape Label Sticker */}
          <div
            className="rounded border-2 border-black p-2 sm:p-2.5 text-black transition-colors"
            style={{ backgroundColor: currentSong.cassetteColor }}
          >
            <div className="flex items-center justify-between border-b border-black/30 pb-1 text-[8.5px] sm:text-[9.5px] font-bold">
              <span className="flex items-center gap-1 sm:gap-1.5">
                <Radio size={11} />
                <span className="truncate max-w-[120px] sm:max-w-none">MOCKINTOSH HI-FI TDK-90</span>
              </span>
              <div className="flex items-center gap-1">
                {currentSong.isExplicit && (
                  <span className="rounded bg-black text-[#ff4d6d] px-1 py-0.2 font-mono text-[7px] sm:text-[8px] font-black border border-black flex items-center gap-0.5">
                    <span className="bg-[#ff4d6d] text-black px-0.5 text-[6px] font-black rounded-2xs">E</span>
                    EXPLICIT
                  </span>
                )}
                <span className="rounded bg-black text-[#d8ee57] px-1.5 py-0.2 font-mono text-[7.5px] sm:text-[8.5px]">
                  {currentSong.edition || 'ORIGINAL'}
                </span>
                <span className="rounded bg-white text-black px-1 py-0.2 font-mono text-[7.5px] sm:text-[8.5px] font-bold border border-black">
                  {soundProfile.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <h4 className="font-mono text-[11px] sm:text-xs md:text-sm font-black tracking-tight truncate max-w-[190px] sm:max-w-none">
                SIDE A: {currentSong.artist} — "{currentSong.title}"
              </h4>
              <span className="text-[8.5px] sm:text-[9.5px] font-bold opacity-75 shrink-0 ml-1.5">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Retro Explicit Tape Parental Advisory Banner */}
          <div className="mt-1.5 flex items-center justify-between px-1 text-[7.5px] sm:text-[8.5px] font-mono">
            <div className="inline-flex items-center gap-1 rounded-xs border border-white/60 bg-black px-1.5 py-0.5 text-white shadow-sm">
              <span className="font-black tracking-wider text-[6.5px] sm:text-[7px] border-r border-white/40 pr-1 text-[#ff4d6d]">
                PARENTAL ADVISORY
              </span>
              <span className="font-bold text-[6.5px] sm:text-[7px] text-[#d8ee57]">
                EXPLICIT CASSETTE TAPE · UNRATED MASTER
              </span>
            </div>
            <span className="text-neutral-400 font-bold hidden xs:inline">
              TYPE II (CrO2)
            </span>
          </div>

          {/* Center Tape Transport Mechanism & Dual Spools */}
          <div className="mt-1.5 flex items-center justify-between rounded border-2 border-black bg-[#111111] p-1.5 sm:p-2.5">
            {/* Left Feed Spool */}
            <div
              className={`flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full border-2 border-white/60 bg-neutral-800 transition-transform duration-300 shrink-0 ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '2.2s' }}
            >
              <div className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 rounded-full border-2 border-white bg-black" />
            </div>

            {/* Center Tape Window with 16-Band Real-Time LED Visualizer */}
            <div className="flex flex-1 flex-col items-center justify-center px-1 sm:px-2.5">
              <canvas
                ref={canvasRef}
                width={180}
                height={28}
                className="h-6 sm:h-8 w-full max-w-[190px] rounded border border-black/40 bg-black/70 shadow-inner"
              />
              <div className="mt-0.5 flex items-center gap-1 text-[7.5px] sm:text-[8px] font-bold text-neutral-400">
                <span className="flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? 'bg-[#39e658] animate-ping' : 'bg-neutral-600'}`} />
                  <span>MOTOR: {isPlaying ? 'RUNNING' : 'STANDBY'}</span>
                </span>
                <span>•</span>
                <span className="text-[#d8ee57] hidden xs:inline">HTML5 STREAM</span>
              </div>
            </div>

            {/* Right Takeup Spool */}
            <div
              className={`flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full border-2 border-white/60 bg-neutral-800 transition-transform duration-300 shrink-0 ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '2.2s' }}
            >
              <div className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 rounded-full border-2 border-white bg-black" />
            </div>
          </div>

          {/* Interactive Audio Scrubber & Progress Bar */}
          <div className="mt-1.5 space-y-0.5">
            <div className="flex items-center justify-between text-[8.5px] sm:text-[9.5px] font-bold text-neutral-300">
              <span>{formatTime(currentTime)}</span>
              <span className="text-[#d8ee57] uppercase text-[7.5px] sm:text-[8.5px] tracking-wider">
                {isPlaying ? '● PLAYING STUDIO MP3' : '❚❚ PAUSED'}
              </span>
              <span>{formatTime(duration)}</span>
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
              className="w-full h-1.5 sm:h-2 rounded-xs appearance-none bg-neutral-800 cursor-pointer accent-[#d8ee57]"
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
