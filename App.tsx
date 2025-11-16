import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { UserProfile, ClothingItem, Consultant, Review } from './types';
import { clothingItems, foundationShades, getZodiacSign, consultants, reviews, fashionPlaylist, categories } from './constants';
import { Logo, SunIcon, MoonIcon, HomeIcon, UserIcon, CogIcon, UploadIcon, ShareIcon, ConsultantIcon, WhatsAppIcon, ZodiacIcon, HangerIcon, BellIcon, ShieldCheckIcon, HeartIcon, InformationCircleIcon, ArrowRightOnRectangleIcon, ChevronRightIcon, CubeTransparentIcon, StarIcon, ChatBubbleLeftRightIcon, MusicNoteIcon, FilterIcon, ViewGridIcon, ViewListIcon, InstagramIcon, FacebookIcon, TikTokIcon } from './components/Icons';

type Page = 'inicio' | 'catalogo' | 'perfil' | 'consultoras' | 'configuracoes';
type AppState = 'welcome' | 'onboarding' | 'main_app';
type Theme = 'light' | 'dark';

// --- Reusable Components (defined outside main App to prevent re-creation on re-renders) ---

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  title?: string;
}
const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, title }) => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-lg border-b border-hot-pink/10">
    <div className="container mx-auto px-4 h-16 flex items-center justify-center relative">
      {title ? (
        <h1 className="font-montserrat text-xl font-bold text-hot-pink text-shadow-hot-pink">{title}</h1>
      ) : (
        <div className="absolute left-4 top-1/2 -translate-y-1/2"><Logo /></div>
      )}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <button onClick={toggleTheme} className="p-2 rounded-full text-delicate-gray hover:text-hot-pink dark:hover:text-hot-pink transition-colors">
          {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
        </button>
      </div>
    </div>
  </header>
);

interface FooterNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}
const FooterNav: React.FC<FooterNavProps> = ({ currentPage, setCurrentPage }) => {
    const navItems: { id: Page, icon: React.ReactNode }[] = [
        { id: 'inicio', icon: <HomeIcon className="w-7 h-7" /> },
        { id: 'catalogo', icon: <HangerIcon className="w-7 h-7" /> },
        { id: 'perfil', icon: <UserIcon className="w-7 h-7" /> },
        { id: 'consultoras', icon: <ConsultantIcon className="w-7 h-7" /> },
        { id: 'configuracoes', icon: <CogIcon className="w-7 h-7" /> },
    ];
    
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-t border-light-gray dark:border-gray-800">
            <div className="container mx-auto px-4 h-20 flex justify-around items-center">
                {navItems.map(item => (
                    <button 
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`relative flex flex-col items-center justify-center w-16 h-16 transition-colors group ${currentPage === item.id ? 'text-hot-pink' : 'text-delicate-gray hover:text-black dark:hover:text-white'}`}
                    >
                        <div className={`absolute w-20 h-20 rounded-full transition-all duration-300 ${currentPage === item.id ? 'bg-hot-pink/10 scale-100' : 'scale-0'}`}></div>
                        <div className={`absolute w-20 h-20 rounded-full blur-lg transition-all duration-300 ${currentPage === item.id ? 'bg-hot-pink/20 scale-100' : 'scale-0'}`}></div>
                        <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                            {item.icon}
                        </div>
                    </button>
                ))}
            </div>
        </nav>
    );
};

const Welcome: React.FC<{ onStart: () => void }> = ({ onStart }) => (
    <div className="p-6 min-h-screen flex flex-col justify-center items-center text-center font-inter animate-fade-in">
        <Logo />
        <h1 className="font-montserrat text-3xl font-bold text-hot-pink mt-8 text-shadow-hot-pink">
            Bem vinda ao mundo gringa, bestie!
        </h1>
        <p className="text-delicate-gray mt-2 mb-12">Pronta para a sua transformação?</p>
        <button onClick={onStart} className="w-full max-w-sm bg-hot-pink text-white font-semibold tracking-wide py-4 rounded-lg font-poppins hover:shadow-lg hover:shadow-hot-pink/40 transition-all transform hover:-translate-y-0.5 animate-glow">
            Vamos começar?
        </button>
    </div>
);


const Onboarding: React.FC<{ onComplete: (profile: UserProfile) => void }> = ({ onComplete }) => {
  const [profile, setProfile] = useState<Partial<UserProfile>>({ name: '', dob: '', skinTone: foundationShades[0].name });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumberField = type === 'number' || ['clothingSize', 'height', 'weight', 'bust', 'waist', 'hip', 'shoulders', 'arm', 'leg', 'shoeSize'].includes(name);
    setProfile(prev => ({ ...prev, [name]: isNumberField ? (value ? parseFloat(value) : '') : value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setPhotoPreview(result);
            setProfile(prev => ({ ...prev, profilePhoto: result }));
        };
        reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = () => {
    onComplete(profile as UserProfile);
  };

  const { age, zodiac } = useMemo(() => {
    if (!profile.dob) return { age: null, zodiac: null };
    try {
      const birthDate = new Date(profile.dob);
      if (isNaN(birthDate.getTime())) return { age: null, zodiac: null };
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      const zodiac = getZodiacSign(birthDate);
      return { age, zodiac };
    } catch { return { age: null, zodiac: null }; }
  }, [profile.dob]);

  const { bmi } = useMemo(() => {
    if (!profile.height || !profile.weight) return { bmi: null };
    const heightInMeters = profile.height / 100;
    const bmiVal = profile.weight / (heightInMeters * heightInMeters);
    return { bmi: parseFloat(bmiVal.toFixed(1)) };
  }, [profile.height, profile.weight]);
  
  const suggestedSize = useMemo(() => {
    const { bust, waist, hip } = profile;
    if (!bust || !waist || !hip) return null;

    const getSizeValue = (measurement: number, thresholds: { p: number, m: number, g: number }) => {
        if (measurement <= thresholds.p) return 1; // P
        if (measurement <= thresholds.m) return 2; // M
        if (measurement <= thresholds.g) return 3; // G
        return 4; // GG
    };

    const bustValue = getSizeValue(bust, { p: 88, m: 95, g: 102 });
    const waistValue = getSizeValue(waist, { p: 70, m: 77, g: 84 });
    const hipValue = getSizeValue(hip, { p: 98, m: 105, g: 112 });

    const finalValue = Math.max(bustValue, waistValue, hipValue);

    switch (finalValue) {
        case 1: return 'P';
        case 2: return 'M';
        case 3: return 'G';
        case 4: return 'GG';
        default: return null;
    }
  }, [profile.bust, profile.waist, profile.hip]);

  const isComplete = profile.name && profile.dob && profile.weight && profile.height && profile.bust && profile.waist && profile.hip && profile.skinTone && profile.clothingSize;

  const InputField: React.FC<{ name: string; placeholder: string; type?: string; value?: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ name, placeholder, type = 'text', value, onChange }) => (
    <input type={type} name={name} placeholder={placeholder} onChange={onChange} value={value} required className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-hot-pink/20 focus:ring-2 focus:ring-hot-pink focus:shadow-lg focus:shadow-hot-pink/30 outline-none text-center transition-all" />
  );

  return (
    <div className="p-4 pt-20 pb-24 font-inter animate-fade-in">
      <div className="space-y-4 text-center">
        <h1 className="font-montserrat text-3xl font-bold text-hot-pink text-shadow-hot-pink">Seu Manequim Virtual</h1>
        <p className="text-delicate-gray mb-6">Preencha tudo para um caimento perfeito!</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <InputField name="name" placeholder="Nome completo" onChange={handleChange} value={profile.name}/>
          <InputField name="dob" placeholder="Data de Nascimento" type="date" onChange={handleChange} value={profile.dob} />
          {(age || zodiac || bmi) && (
            <div className="bg-white dark:bg-gray-900 p-3 rounded-lg grid grid-cols-3 divide-x dark:divide-gray-700 text-sm">
              <div className="px-1"><strong>Idade:</strong> {age || '-'}</div>
              <div className="px-1 flex items-center justify-center gap-1"><strong>Signo:</strong> {zodiac ? <ZodiacIcon sign={zodiac} className="w-4 h-4" /> : '-' }</div>
              <div className="px-1"><strong>IMC:</strong> {bmi || '-'}</div>
            </div>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg">
          <h2 className="font-poppins font-semibold mb-3 text-center dark:text-white">Medidas Corporais</h2>
          <div className="grid grid-cols-2 gap-3">
            <InputField name="height" placeholder="Altura (cm)" type="number" onChange={handleChange} value={profile.height} />
            <InputField name="weight" placeholder="Peso (kg)" type="number" onChange={handleChange} value={profile.weight} />
            <InputField name="bust" placeholder="Busto (cm)" type="number" onChange={handleChange} value={profile.bust} />
            <InputField name="waist" placeholder="Cintura (cm)" type="number" onChange={handleChange} value={profile.waist} />
            <InputField name="hip" placeholder="Quadril (cm)" type="number" onChange={handleChange} value={profile.hip} />
            <InputField name="shoulders" placeholder="Largura Ombros (cm)" type="number" onChange={handleChange} value={profile.shoulders} />
            <InputField name="arm" placeholder="Braço (cm)" type="number" onChange={handleChange} value={profile.arm} />
            <InputField name="leg" placeholder="Perna (interno, cm)" type="number" onChange={handleChange} value={profile.leg} />
            <InputField name="shoeSize" placeholder="Calçado (BR)" type="number" onChange={handleChange} value={profile.shoeSize} />
             <select name="clothingSize" onChange={handleChange} value={profile.clothingSize || ''} required className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-hot-pink/20 focus:ring-2 focus:ring-hot-pink focus:shadow-lg focus:shadow-hot-pink/30 outline-none text-center transition-all appearance-none col-span-2">
                <option value="" disabled>Tamanho que veste</option>
                <option value="34">34</option>
                <option value="36">36</option>
                <option value="38">38</option>
                <option value="40">40</option>
                <option value="42">42</option>
                <option value="44">44</option>
            </select>
          </div>
        </div>
        
        {suggestedSize && (
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg text-center">
                <h2 className="font-poppins font-semibold mb-2 text-center dark:text-white">Tamanho Sugerido</h2>
                <p className="text-4xl font-bold text-hot-pink font-montserrat text-shadow-hot-pink">{suggestedSize}</p>
                <p className="text-xs text-delicate-gray mt-1">Com base nas suas medidas, recomendamos este tamanho.</p>
            </div>
        )}

         <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg">
           <h2 className="font-poppins font-semibold mb-3 text-center dark:text-white">Tom de Pele</h2>
           <div className="grid grid-cols-5 gap-2">
             {foundationShades.map(shade => (
               <button key={shade.name} onClick={() => setProfile(p => ({...p, skinTone: shade.name}))} className={`w-full aspect-square rounded-full transition-all border-4 ${profile.skinTone === shade.name ? 'border-hot-pink scale-110' : 'border-transparent'}`} style={{backgroundColor: shade.color}} title={shade.name}></button>
             ))}
           </div>
           <p className="text-center text-xs text-delicate-gray mt-2">{profile.skinTone || 'Selecione um tom'}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg">
           <h2 className="font-poppins font-semibold mb-3 text-center dark:text-white">Sua Foto</h2>
            <label htmlFor="onboarding-photo-upload" className="w-full aspect-square border-2 border-dashed border-delicate-gray rounded-lg flex flex-col justify-center items-center text-center p-4 cursor-pointer hover:border-hot-pink hover:text-hot-pink transition-colors dark:hover:border-hot-pink dark:text-white overflow-hidden">
                {photoPreview ? (
                    <img src={photoPreview} alt="Preview do Perfil" className="w-full h-full object-cover rounded-md"/>
                ) : (
                    <>
                        <UploadIcon className="w-10 h-10 text-delicate-gray mb-2" />
                        <span className="text-sm font-medium">Envie sua foto</span>
                        <span className="text-xs text-delicate-gray mt-1">Perfil ou corpo inteiro</span>
                    </>
                )}
            </label>
            <input id="onboarding-photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
        </div>

        <button onClick={handleSubmit} disabled={!isComplete} className="w-full bg-hot-pink text-white font-semibold tracking-wide py-4 rounded-lg mt-4 font-poppins hover:shadow-lg hover:shadow-hot-pink/40 transition-all disabled:bg-delicate-gray disabled:shadow-none transform hover:-translate-y-0.5">
          Avançar
        </button>
      </div>
    </div>
  );
};

const Inicio: React.FC<{ profile: UserProfile | null, onNavigate: (page: Page) => void }> = ({ profile, onNavigate }) => {
    return (
        <div className="p-4 pt-20 pb-24 font-inter text-center">
            <h1 className="font-montserrat text-4xl font-bold mb-2 dark:text-white text-shadow-hot-pink">Olá, {profile?.name.split(' ')[0]}!</h1>
            <p className="text-delicate-gray tracking-widest mb-8">Bem-vinda de volta ao seu closet virtual.</p>

            <div className="grid grid-cols-1 gap-4">
                 <button onClick={() => onNavigate('catalogo')} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl hover:shadow-hot-pink/20 transition-all transform hover:-translate-y-1 text-left flex items-center gap-4">
                    <HangerIcon className="w-10 h-10 text-hot-pink" />
                    <div>
                        <h2 className="font-poppins text-lg font-semibold dark:text-white">Ver Catálogo</h2>
                        <p className="text-delicate-gray text-sm">Explore as novidades e monte seu look.</p>
                    </div>
                </button>
                 <button onClick={() => onNavigate('perfil')} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl hover:shadow-hot-pink/20 transition-all transform hover:-translate-y-1 text-left flex items-center gap-4">
                    <UserIcon className="w-10 h-10 text-hot-pink" />
                    <div>
                        <h2 className="font-poppins text-lg font-semibold dark:text-white">Meu Manequim</h2>
                        <p className="text-delicate-gray text-sm">Confira e ajuste suas medidas.</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

const ProfileAndMannequin: React.FC<{ profile: UserProfile | null }> = ({ profile }) => {
    if (!profile) return <div className="p-4 pt-20 pb-24 text-center">Carregando perfil...</div>;

    const details = [
        { label: "Altura", value: profile.height, unit: "cm" }, { label: "Peso", value: profile.weight, unit: "kg" },
        { label: "Busto", value: profile.bust, unit: "cm" }, { label: "Cintura", value: profile.waist, unit: "cm" },
        { label: "Quadril", value: profile.hip, unit: "cm" }, { label: "Ombros", value: profile.shoulders, unit: "cm" },
        { label: "Braço", value: profile.arm, unit: "cm" }, { label: "Perna", value: profile.leg, unit: "cm" },
        { label: "Calçado", value: profile.shoeSize, unit: "BR" },
    ];

    return (
        <div className="p-4 pt-20 pb-24 font-inter">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl flex items-center space-x-4">
                {profile.profilePhoto ? (
                    <img src={profile.profilePhoto} alt={profile.name} className="w-20 h-20 rounded-full border-4 border-hot-pink shadow-md object-cover" />
                ) : (
                    <div className="w-20 h-20 rounded-full border-4 border-hot-pink shadow-md flex items-center justify-center bg-light-gray dark:bg-gray-800">
                        <UserIcon className="w-10 h-10 text-hot-pink"/>
                    </div>
                )}
                <div>
                    <h2 className="font-poppins text-2xl font-semibold dark:text-white">{profile.name}</h2>
                    <p className="text-delicate-gray">Seu manequim virtual está pronto.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl mt-6">
                <h3 className="font-poppins text-lg font-semibold mb-4 dark:text-white">Suas Medidas</h3>
                <div className="grid grid-cols-3 gap-y-4 gap-x-2 text-center text-sm">
                    {details.map(d => (
                        <div key={d.label}>
                            <p className="text-delicate-gray">{d.label}</p>
                            <p className="font-semibold text-black dark:text-white">{d.value || '-'} {d.value && d.unit}</p>
                        </div>
                    ))}
                </div>
            </div>
             <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-xl mt-6">
                <h3 className="font-poppins text-lg font-semibold mb-4 dark:text-white text-center">Tecnologia do Manequim</h3>
                <p className="text-center text-xs text-delicate-gray mb-4">Usamos modelos 3D realistas para garantir o caimento perfeito das peças no seu biotipo.</p>
                <div className="grid grid-cols-3 gap-2">
                    <img src="https://storage.googleapis.com/aai-web-samples/app-forge/usegracistore/mannequin1.png" alt="Mannequin Model 1" className="rounded-lg" />
                    <img src="https://storage.googleapis.com/aai-web-samples/app-forge/usegracistore/mannequin2.png" alt="Mannequin Model 2" className="rounded-lg" />
                    <img src="https://storage.googleapis.com/aai-web-samples/app-forge/usegracistore/mannequin3.png" alt="Mannequin Model 3" className="rounded-lg" />
                </div>
             </div>
        </div>
    );
};

const ConsultantPage: React.FC<{ consultant: Consultant | null; onNavigate: (page: string, subpage?: string) => void; }> = ({ consultant, onNavigate }) => {
    if (!consultant) {
        consultant = consultants[0];
    }

    return (
        <div className="p-4 pt-20 pb-24 font-inter min-h-screen">
             <div className="bg-white dark:bg-black rounded-2xl shadow-2xl p-6 border border-hot-pink/30 relative text-center mt-16">
                <img src={consultant.photoUrl} alt={consultant.name} className="w-32 h-32 rounded-full mx-auto -mt-24 border-8 border-white dark:border-black shadow-lg" />
                <h2 className="font-montserrat text-3xl font-bold text-hot-pink mt-4 text-shadow-hot-pink">{consultant.name}</h2>
                <p className="text-delicate-gray font-medium">Sua consultora dedicada</p>
                <p className="dark:text-white/80 my-4 text-sm italic">"{consultant.welcomeMessage}"</p>
                <div className="text-xs text-delicate-gray bg-light-gray dark:bg-gray-800 py-1 px-3 rounded-full inline-block">
                    {consultant.hours}
                </div>
            </div>

            <div className="mt-8 space-y-4">
                 <a href={`https://wa.me/${consultant.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full bg-hot-pink text-white font-semibold tracking-wide py-4 rounded-lg font-poppins flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-hot-pink/40 transition-all transform hover:-translate-y-0.5 text-lg">
                    <WhatsAppIcon className="w-6 h-6" />
                    Falar com a Consultora
                </a>
                 <button onClick={() => onNavigate('catalogo')} className="w-full bg-transparent border-2 border-hot-pink text-hot-pink font-bold py-3 rounded-lg font-poppins hover:bg-hot-pink hover:text-white transition-all text-lg transform hover:-translate-y-0.5">
                    Ver Catálogo
                </button>
            </div>
        </div>
    );
};

const SettingsListItem: React.FC<{ icon: React.ReactNode; title: string; subtitle?: string; onClick?: () => void; }> = ({ icon, title, subtitle, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center p-4 bg-light-gray/50 dark:bg-gray-900/50 rounded-lg hover:bg-hot-pink/10 dark:hover:bg-hot-pink/10 transition-colors">
    <div className="mr-4 text-hot-pink">{icon}</div>
    <div className="text-left">
      <p className="font-poppins font-medium dark:text-white">{title}</p>
      {subtitle && <p className="text-sm text-delicate-gray">{subtitle}</p>}
    </div>
    <ChevronRightIcon className="w-5 h-5 ml-auto text-delicate-gray" />
  </button>
);

const Settings: React.FC<{ 
  theme: Theme; 
  toggleTheme: () => void;
  profile: UserProfile | null;
  consultant: Consultant | null;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}> = ({ theme, toggleTheme, profile, consultant, onNavigate, onLogout }) => {
  return (
    <div className="p-4 pt-20 pb-24 font-inter">
      <div className="space-y-6">
        <div className="p-4 bg-light-gray/50 dark:bg-gray-900/50 rounded-lg flex justify-between items-center">
          <p className="font-poppins font-medium dark:text-white">Modo Escuro</p>
          <button onClick={toggleTheme} className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${theme === 'dark' ? 'bg-hot-pink' : 'bg-gray-300 dark:bg-gray-700'}`}>
            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${theme === 'dark' ? 'translate-x-6' : ''}`} />
          </button>
        </div>

        {profile && (
          <div>
            <h2 className="font-poppins text-lg font-semibold mb-2 dark:text-white/80">Sua Conta</h2>
            <div className="p-4 bg-light-gray/50 dark:bg-gray-900/50 rounded-lg space-y-2">
              <p className="text-delicate-gray">Nome: <span className="font-semibold text-black dark:text-white">{profile.name}</span></p>
            </div>
          </div>
        )}

        <div className="space-y-2">
            <SettingsListItem icon={<ShieldCheckIcon className="w-6 h-6" />} title="Privacidade e Segurança" />
            <SettingsListItem icon={<BellIcon className="w-6 h-6" />} title="Notificações" />
            <SettingsListItem icon={<InformationCircleIcon className="w-6 h-6" />} title="Sobre o App" subtitle="@usegracistore | (69) 9 9902-6793" />
        </div>
        
        <button onClick={onLogout} className="w-full text-hot-pink font-bold py-3 rounded-lg font-poppins hover:bg-hot-pink/10 transition-colors flex items-center justify-center gap-2">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Sair
        </button>
      </div>
    </div>
  );
};

const CatalogPage: React.FC<{}> = () => {
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');
    const [favorites, setFavorites] = useState<number[]>([]);
    const [sortBy, setSortBy] = useState('relevance');
    const [priceRange, setPriceRange] = useState({ min: 75, max: 150 });
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [isAboutUsOpen, setAboutUsOpen] = useState(false);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('userFavorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const toggleFavorite = (id: number) => {
        const newFavorites = favorites.includes(id)
            ? favorites.filter(favId => favId !== id)
            : [...favorites, id];
        setFavorites(newFavorites);
        localStorage.setItem('userFavorites', JSON.stringify(newFavorites));
    };

    const filteredAndSortedItems = useMemo(() => {
        let items = [...clothingItems];
        if (showOnlyAvailable) {
            items = items.filter(item => item.isAvailable);
        }
        if (showOnlyFavorites) {
            items = items.filter(item => favorites.includes(item.id));
        }
        items = items.filter(item => {
            const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
            return price >= priceRange.min && price <= priceRange.max;
        });
        if (selectedCategories.length > 0) {
            items = items.filter(item => selectedCategories.includes(item.category));
        }
        if (selectedTags.length > 0) {
            items = items.filter(item => item.tags?.some(tag => selectedTags.includes(tag)));
        }

        // Sorting logic here
        // ...

        return items;
    }, [clothingItems, showOnlyAvailable, showOnlyFavorites, priceRange, selectedCategories, selectedTags, favorites, sortBy]);

    const SocialLink: React.FC<{href: string; icon: React.ReactNode}> = ({href, icon}) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-delicate-gray hover:text-hot-pink transition-colors">{icon}</a>
    );

    return (
        <div className="p-4 pt-20 pb-24 font-inter">
            {isFilterOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 animate-fade-in" onClick={() => setFilterOpen(false)}>
                    <div className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-2xl p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <h2 className="font-montserrat text-2xl font-bold text-hot-pink mb-6">Filtros</h2>
                        {/* Filter content here */}
                        <div className="space-y-4">
                            <div>
                                <label className="font-poppins font-semibold dark:text-white">Preço</label>
                                <div className="flex justify-between text-sm text-delicate-gray"><span>R${priceRange.min}</span><span>R${priceRange.max}</span></div>
                                <input type="range" min="75" max="150" value={priceRange.max} onChange={e => setPriceRange({...priceRange, max: parseInt(e.target.value)})} className="w-full h-2 bg-light-gray rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                            </div>
                            <div>
                                <label className="font-poppins font-semibold dark:text-white">Categorias</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {categories.map(cat => (
                                        <button key={cat} onClick={() => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])} className={`px-3 py-1 text-sm rounded-full border-2 ${selectedCategories.includes(cat) ? 'bg-hot-pink text-white border-hot-pink' : 'bg-transparent border-light-gray dark:border-gray-600'}`}>{cat}</button>
                                    ))}
                                </div>
                            </div>
                            <label className="flex items-center gap-2"><input type="checkbox" checked={showOnlyFavorites} onChange={e => setShowOnlyFavorites(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-hot-pink focus:ring-hot-pink" /> Apenas Favoritos</label>
                        </div>
                        <button onClick={() => setFilterOpen(false)} className="w-full mt-8 bg-hot-pink text-white font-semibold py-3 rounded-lg">Aplicar Filtros</button>
                    </div>
                </div>
            )}
            
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg mb-4">
                 <button onClick={() => setAboutUsOpen(!isAboutUsOpen)} className="w-full text-left font-poppins font-semibold flex justify-between items-center dark:text-white">
                    Sobre Nós - USE GRACI STORE
                    <ChevronRightIcon className={`w-5 h-5 transition-transform ${isAboutUsOpen ? 'rotate-90' : ''}`} />
                 </button>
                 {isAboutUsOpen && (
                     <div className="mt-4 text-sm text-delicate-gray space-y-2 border-t pt-4">
                        <p className="italic font-semibold text-hot-pink">"O melhor da moda gringa da região."</p>
                        <p><strong>WhatsApp:</strong> 69 9902-6793</p>
                        <p><strong>E-mail:</strong> sac.usegracistore@gmail.com</p>
                        <p><strong>Endereço:</strong> Av. Sabino Bezerra de Queiroz, 6273, Jd. Eldorado, Vilhena - RO</p>
                        <p><strong>Site:</strong> www.usegraciestories.com.br</p>
                        <p><strong>Horários:</strong> Seg–Sex: 9h-19h | Sáb: 10h-16h</p>
                        <div className="flex gap-4 pt-2">
                           <SocialLink href="https://instagram.com/usegracistore" icon={<InstagramIcon className="w-6 h-6" />} />
                           <SocialLink href="#" icon={<FacebookIcon className="w-6 h-6" />} />
                           <SocialLink href="#" icon={<TikTokIcon className="w-6 h-6" />} />
                        </div>
                     </div>
                 )}
            </div>
            
            <a href="https://vestilink.app/use-graci-store/catalog" target="_blank" rel="noopener noreferrer" className="w-full mb-4 bg-hot-pink text-white font-semibold tracking-wide py-3 rounded-lg font-poppins flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-hot-pink/40 transition-all transform hover:-translate-y-0.5 text-lg">
                Ver Catálogo Oficial
            </a>
            
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => setFilterOpen(true)} className="flex items-center gap-2 text-hot-pink font-semibold p-2 rounded-lg hover:bg-hot-pink/10"><FilterIcon className="w-5 h-5" /> Filtros</button>
                <div className="flex gap-2">
                    <button onClick={() => setLayout('grid')} className={`p-2 rounded-lg ${layout === 'grid' ? 'bg-hot-pink text-white' : 'hover:bg-hot-pink/10'}`}><ViewGridIcon className="w-5 h-5"/></button>
                    <button onClick={() => setLayout('list')} className={`p-2 rounded-lg ${layout === 'list' ? 'bg-hot-pink text-white' : 'hover:bg-hot-pink/10'}`}><ViewListIcon className="w-5 h-5"/></button>
                </div>
            </div>

            <div className={layout === 'grid' ? "grid grid-cols-2 gap-4" : "space-y-4"}>
                {filteredAndSortedItems.map(item => (
                    <div key={item.id} className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${layout === 'list' ? 'flex gap-4' : ''}`}>
                        <div className={`relative ${layout === 'list' ? 'w-1/3' : 'aspect-[3/4]'}`}>
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover"/>
                            <button onClick={() => toggleFavorite(item.id)} className="absolute top-2 right-2 p-1.5 bg-white/70 backdrop-blur-sm rounded-full">
                                <HeartIcon className={`w-5 h-5 transition-colors ${favorites.includes(item.id) ? 'text-hot-pink' : 'text-delicate-gray'}`} filled={favorites.includes(item.id)}/>
                            </button>
                        </div>
                        <div className="p-3 flex flex-col flex-grow">
                            <h3 className="font-poppins font-semibold dark:text-white">{item.name}</h3>
                            <p className="text-hot-pink font-bold">{item.price}</p>
                            <div className="flex gap-1.5 my-2">
                                {item.colors.map(c => <div key={c} className="w-4 h-4 rounded-full border border-black/10" style={{backgroundColor: c}}></div>)}
                            </div>
                             {!item.isAvailable && <p className="text-xs text-burnt-rose font-semibold">Indisponível</p>}
                            <a href={`https://wa.me/5569999026793?text=Olá! Tenho interesse na peça ${item.name}`} target="_blank" rel="noopener noreferrer" className="mt-auto w-full bg-light-gray dark:bg-gray-800 text-delicate-gray text-xs font-bold py-2 rounded-lg text-center hover:bg-hot-pink hover:text-white transition-colors">
                                Comprar via WhatsApp
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Main App Component ---
export default function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [appState, setAppState] = useState<AppState>('welcome');
  const [currentPage, setCurrentPage] = useState<Page>('inicio');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const consultantId = urlParams.get('consultant');
    if (consultantId) {
        const foundConsultant = consultants.find(c => c.id === consultantId.toLowerCase());
        if (foundConsultant) {
            setSelectedConsultant(foundConsultant);
            setCurrentPage('consultoras');
        }
    }
    
    try {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            setUserProfile(JSON.parse(savedProfile));
            setAppState('main_app');
        } else {
            setAppState('welcome');
        }
    } catch (error) {
        console.error("Failed to parse user profile", error);
        setAppState('welcome');
    }
    setIsLoading(false);
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setAppState('main_app');
    setCurrentPage('inicio');
  };
  
  const handleLogout = () => {
    setUserProfile(null);
    localStorage.removeItem('userProfile');
    setAppState('welcome');
  };

  const getHeaderTitle = () => {
    if (appState !== 'main_app') return undefined;
    switch(currentPage) {
        case 'inicio': return undefined;
        case 'catalogo': return "Catálogo";
        case 'perfil': return "Meu Perfil & Manequim";
        case 'consultoras': return "Sua Consultora";
        case 'configuracoes': return "Configurações";
        default: return undefined;
    }
  };
  
  const renderContent = () => {
    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-hot-pink border-t-transparent rounded-full animate-spin"></div></div>;
    }

    if (appState === 'welcome') {
      return <Welcome onStart={() => setAppState('onboarding')} />;
    }
    
    if (appState === 'onboarding') {
      return <Onboarding onComplete={handleOnboardingComplete} />;
    }

    switch (currentPage) {
      case 'inicio': return <Inicio profile={userProfile} onNavigate={setCurrentPage} />;
      case 'catalogo': return <CatalogPage />;
      case 'perfil': return <ProfileAndMannequin profile={userProfile} />;
      case 'consultoras': return <ConsultantPage consultant={selectedConsultant} onNavigate={(p) => setCurrentPage(p as Page)} />;
      case 'configuracoes': return <Settings theme={theme} toggleTheme={toggleTheme} profile={userProfile} consultant={selectedConsultant} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      default: return <Inicio profile={userProfile} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      <div className="container mx-auto max-w-lg relative">
        <Header theme={theme} toggleTheme={toggleTheme} title={getHeaderTitle()} />
        <main>
            {renderContent()}
        </main>
        {appState === 'main_app' && <FooterNav currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      </div>
    </div>
  );
}
