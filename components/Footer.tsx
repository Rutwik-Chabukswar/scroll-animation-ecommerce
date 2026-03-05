export default function Footer() {
    return (
        <footer className="py-20 px-6 md:px-12 bg-[#050505] border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white font-outfit uppercase tracking-tighter">
                        Pure Juice<span className="text-primary">.</span>
                    </h2>
                    <p className="text-white/40 text-sm font-outfit max-w-xs">
                        Delivering the freshest, cold-pressed organic juices straight to your door.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <h4 className="text-white font-bold font-outfit text-sm uppercase tracking-widest">Shop</h4>
                        <ul className="space-y-2 text-white/40 text-sm font-outfit">
                            <li><a href="#" className="hover:text-primary transition-colors">All Juices</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Subcriptions</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-white font-bold font-outfit text-sm uppercase tracking-widest">About</h4>
                        <ul className="space-y-2 text-white/40 text-sm font-outfit">
                            <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-white font-bold font-outfit text-sm uppercase tracking-widest">Social</h4>
                        <ul className="space-y-2 text-white/40 text-sm font-outfit">
                            <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Facebook</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-white/20 text-xs font-outfit">
                    &copy; {new Date().getFullYear()} Pure Juice Inc. All rights reserved.
                </p>
                <div className="flex gap-8 text-white/20 text-xs font-outfit">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
