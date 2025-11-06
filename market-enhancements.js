/**
 * InternHub Market-Ready Enhancements
 * All competitive features in one file
 */

// ==================== STORAGE MANAGER ====================
class StorageManager {
    static get(key, defaultValue = []) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch {
            return defaultValue;
        }
    }
    
    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        window.dispatchEvent(new CustomEvent(`storage:${key}`, { detail: value }));
    }
    
    // Specific getters
    static getInternships() { return this.get('internships', []); }
    static getApplications() { return this.get('applications', []); }
    static getNotifications() { return this.get('notifications', []); }
    static getCurrentUser() { return this.get('currentUser', null); }
    static getUserProfile() { return this.get('userProfile', {}); }
    static getSavedSearches() { return this.get('savedSearches', []); }
    static getRecentlyViewed() { return this.get('recentlyViewed', []); }
    
    // Application tracking
    static trackApplication(appId, status) {
        const apps = this.getApplications();
        const app = apps.find(a => a.id === appId);
        if (app) {
            app.status = status;
            app.statusUpdatedAt = new Date().toISOString();
            if (!app.statusHistory) app.statusHistory = [];
            app.statusHistory.push({ status, timestamp: new Date().toISOString() });
            this.set('applications', apps);
        }
    }
}

// ==================== PROFILE COMPLETION ====================
class ProfileManager {
    static calculateCompletion() {
        const profile = StorageManager.getUserProfile();
        const fields = [
            'name', 'email', 'phone', 'college', 'degree', 'year',
            'skills', 'experience', 'resume', 'bio', 'linkedin', 'github'
        ];
        
        let completed = 0;
        fields.forEach(field => {
            if (profile[field] && profile[field].length > 0) completed++;
        });
        
        return Math.round((completed / fields.length) * 100);
    }
    
    static getMissingFields() {
        const profile = StorageManager.getUserProfile();
        const missing = [];
        
        if (!profile.name) missing.push('Full Name');
        if (!profile.skills || profile.skills.length === 0) missing.push('Skills');
        if (!profile.resume) missing.push('Resume');
        if (!profile.bio) missing.push('Bio/Summary');
        if (!profile.experience) missing.push('Experience');
        
        return missing;
    }
    
    static renderCompletionWidget() {
        const completion = this.calculateCompletion();
        const missing = this.getMissingFields();
        
        return `
            <div class="profile-completion-widget" style="background: linear-gradient(135deg, #fff 0%, #f6f1e7 100%); padding: 1.5rem; border-radius: 12px; border: 2px solid rgba(14,165,233,0.2); margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h3 style="margin: 0; color: #1e3a8a;"><i class="fas fa-user-check"></i> Profile Strength</h3>
                    <span style="font-size: 2rem; font-weight: 800; color: ${completion >= 80 ? '#10b981' : completion >= 50 ? '#f59e0b' : '#ef4444'};">${completion}%</span>
                </div>
                <div style="background: #e5e7eb; height: 12px; border-radius: 20px; overflow: hidden; margin-bottom: 1rem;">
                    <div style="background: linear-gradient(90deg, #1e3a8a, #0ea5e9); height: 100%; width: ${completion}%; transition: width 0.5s;"></div>
                </div>
                ${missing.length > 0 ? `
                    <div style="background: rgba(239,68,68,0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #ef4444;">
                        <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #ef4444;"><i class="fas fa-exclamation-circle"></i> Complete your profile to get more opportunities!</p>
                        <p style="margin: 0; font-size: 0.9rem; color: #6b7280;">Missing: ${missing.join(', ')}</p>
                    </div>
                ` : '<p style="color: #10b981; margin: 0;"><i class="fas fa-check-circle"></i> Your profile is complete!</p>'}
            </div>
        `;
    }
}

// ==================== SMART RECOMMENDATIONS ====================
class RecommendationEngine {
    static getRecommendations() {
        const profile = StorageManager.getUserProfile();
        const internships = StorageManager.getInternships();
        const userSkills = (profile.skills || []).map(s => s.toLowerCase());
        
        if (!userSkills.length) return internships.slice(0, 5);
        
        // Score each internship
        const scored = internships.map(job => {
            let score = 0;
            const jobSkills = (job.skills || []).map(s => s.toLowerCase());
            
            // Skill matching (most important)
            const matchingSkills = jobSkills.filter(js => 
                userSkills.some(us => js.includes(us) || us.includes(js))
            );
            score += matchingSkills.length * 10;
            
            // Location preference
            if (profile.preferredLocation && job.location) {
                if (job.location.toLowerCase().includes(profile.preferredLocation.toLowerCase())) {
                    score += 5;
                }
            }
            
            // Remote preference
            if (job.location && job.location.toLowerCase().includes('remote')) {
                score += 3;
            }
            
            return { ...job, matchScore: score, matchingSkills };
        });
        
        // Sort by score and return top 10
        return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 10);
    }
    
    static renderRecommendations() {
        const recommended = this.getRecommendations();
        if (!recommended.length) return '';
        
        return `
            <section style="padding: 3rem 2rem; background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);">
                <div style="max-width: 1400px; margin: 0 auto;">
                    <h2 style="text-align: center; margin-bottom: 2rem; color: #1e3a8a;">
                        <i class="fas fa-magic"></i> Recommended For You
                    </h2>
                    <div class="internship-grid">
                        ${recommended.slice(0, 6).map(job => this.renderJobCard(job)).join('')}
                    </div>
                </div>
            </section>
        `;
    }
    
    static renderJobCard(job) {
        const matchPercent = Math.min(100, job.matchScore * 2);
        return `
            <div class="internship-card" onclick="openJobDetail(${job.id})">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <h3 style="margin: 0;">${job.position}</h3>
                    ${job.matchScore > 0 ? `<span style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">${matchPercent}% Match</span>` : ''}
                </div>
                <p><strong>${job.company}</strong></p>
                <p><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                <p><i class="fas fa-money-bill-wave"></i> ${job.stipend}</p>
                <div class="skills-tags">
                    ${(job.matchingSkills || []).map(skill => `<span class="skill-tag" style="background: rgba(16,185,129,0.2); color: #059669;">${skill}</span>`).join('')}
                </div>
                <button class="btn" onclick="event.stopPropagation(); quickApply(${job.id})">Quick Apply</button>
            </div>
        `;
    }
}

// ==================== GAMIFICATION ====================
class GamificationManager {
    static getBadges() {
        const profile = StorageManager.getUserProfile();
        const apps = StorageManager.getApplications();
        const badges = [];
        
        // Profile completion
        const completion = ProfileManager.calculateCompletion();
        if (completion === 100) {
            badges.push({ icon: 'fa-star', name: 'Profile Master', color: '#f59e0b', desc: 'Completed 100% profile' });
        }
        
        // Application count
        if (apps.length >= 1) badges.push({ icon: 'fa-paper-plane', name: 'First Step', color: '#0ea5e9', desc: 'Applied to first internship' });
        if (apps.length >= 10) badges.push({ icon: 'fa-rocket', name: 'Go-Getter', color: '#8b5cf6', desc: 'Applied to 10+ internships' });
        if (apps.length >= 50) badges.push({ icon: 'fa-fire', name: 'Super Hustler', color: '#ef4444', desc: 'Applied to 50+ internships' });
        
        // Early bird
        const today = new Date().toDateString();
        const todayApps = apps.filter(a => new Date(a.appliedDate).toDateString() === today);
        if (todayApps.length > 0) {
            badges.push({ icon: 'fa-sun', name: 'Early Bird', color: '#fbbf24', desc: 'Applied today!' });
        }
        
        // Streak
        const streak = this.calculateStreak();
        if (streak >= 7) badges.push({ icon: 'fa-calendar-check', name: '7-Day Streak', color: '#10b981', desc: 'Active for 7 days' });
        
        return badges;
    }
    
    static calculateStreak() {
        const apps = StorageManager.getApplications();
        if (!apps.length) return 0;
        
        // Simple streak: days with at least one activity
        const uniqueDays = [...new Set(apps.map(a => new Date(a.appliedDate).toDateString()))];
        return uniqueDays.length;
    }
    
    static renderBadges() {
        const badges = this.getBadges();
        if (!badges.length) return '';
        
        return `
            <div style="background: white; padding: 1.5rem; border-radius: 12px; border: 2px solid rgba(30,58,138,0.1); margin-bottom: 2rem;">
                <h3 style="margin: 0 0 1rem 0; color: #1e3a8a;"><i class="fas fa-trophy"></i> Your Badges</h3>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    ${badges.map(b => `
                        <div style="background: ${b.color}15; border: 2px solid ${b.color}; padding: 1rem; border-radius: 10px; text-align: center; min-width: 120px;" title="${b.desc}">
                            <i class="fas ${b.icon}" style="font-size: 2rem; color: ${b.color}; display: block; margin-bottom: 0.5rem;"></i>
                            <div style="font-weight: 700; font-size: 0.85rem; color: ${b.color};">${b.name}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// ==================== ADVANCED SEARCH ====================
class AdvancedSearch {
    static filters = {
        location: '',
        workMode: '', // remote, hybrid, on-site
        duration: '', // 1-3 months, 3-6 months, 6+ months
        stipendMin: 0,
        stipendMax: 100000,
        skills: [],
        company: '',
        datePosted: '' // today, week, month, all
    };
    
    static applyFilters(internships) {
        let filtered = [...internships];
        
        // Location filter
        if (this.filters.location) {
            filtered = filtered.filter(i => 
                i.location.toLowerCase().includes(this.filters.location.toLowerCase())
            );
        }
        
        // Work mode
        if (this.filters.workMode) {
            filtered = filtered.filter(i => {
                const loc = i.location.toLowerCase();
                if (this.filters.workMode === 'remote') return loc.includes('remote');
                if (this.filters.workMode === 'hybrid') return loc.includes('hybrid');
                if (this.filters.workMode === 'on-site') return !loc.includes('remote') && !loc.includes('hybrid');
                return true;
            });
        }
        
        // Skills
        if (this.filters.skills.length > 0) {
            filtered = filtered.filter(i => {
                const jobSkills = (i.skills || []).map(s => s.toLowerCase());
                return this.filters.skills.some(skill => 
                    jobSkills.some(js => js.includes(skill.toLowerCase()))
                );
            });
        }
        
        return filtered;
    }
    
    static saveSearch(name) {
        const searches = StorageManager.getSavedSearches();
        searches.push({
            id: Date.now(),
            name,
            filters: { ...this.filters },
            savedAt: new Date().toISOString()
        });
        StorageManager.set('savedSearches', searches);
    }
    
    static renderSavedSearches() {
        const searches = StorageManager.getSavedSearches();
        if (!searches.length) return '';
        
        return `
            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin: 0 0 1rem 0; color: #1e3a8a;"><i class="fas fa-bookmark"></i> Saved Searches</h4>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${searches.map(s => `
                        <button onclick="loadSavedSearch(${s.id})" style="padding: 0.5rem 1rem; background: rgba(14,165,233,0.1); color: #0ea5e9; border: 2px solid #0ea5e9; border-radius: 20px; cursor: pointer; font-weight: 600;">
                            ${s.name} <i class="fas fa-search"></i>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// ==================== APPLICATION STATUS TRACKER ====================
class ApplicationTracker {
    static STATUS_FLOW = ['Applied', 'Screening', 'Interview', 'Offer', 'Accepted'];
    static STATUS_COLORS = {
        'Applied': '#6b7280',
        'Screening': '#f59e0b',
        'Interview': '#0ea5e9',
        'Offer': '#8b5cf6',
        'Accepted': '#10b981',
        'Rejected': '#ef4444'
    };
    
    static renderTracker(application) {
        const currentStatus = application.status || 'Applied';
        const statusIndex = this.STATUS_FLOW.indexOf(currentStatus);
        
        return `
            <div style="background: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                <h3 style="margin: 0 0 1.5rem 0; color: #1e3a8a;">
                    <i class="fas fa-route"></i> Application Status: ${application.position}
                </h3>
                
                <!-- Progress Bar -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; position: relative;">
                    <!-- Connection Line -->
                    <div style="position: absolute; top: 20px; left: 0; right: 0; height: 4px; background: #e5e7eb; z-index: 0;"></div>
                    <div style="position: absolute; top: 20px; left: 0; width: ${(statusIndex / (this.STATUS_FLOW.length - 1)) * 100}%; height: 4px; background: linear-gradient(90deg, #1e3a8a, #0ea5e9); z-index: 1; transition: width 0.5s;"></div>
                    
                    ${this.STATUS_FLOW.map((status, index) => {
                        const isActive = index <= statusIndex;
                        const isCurrent = status === currentStatus;
                        return `
                            <div style="display: flex; flex-direction: column; align-items: center; position: relative; z-index: 2;">
                                <div style="width: 40px; height: 40px; border-radius: 50%; background: ${isActive ? 'linear-gradient(135deg, #1e3a8a, #0ea5e9)' : '#e5e7eb'}; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; border: 4px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
                                    ${isActive ? '<i class="fas fa-check"></i>' : index + 1}
                                </div>
                                <div style="margin-top: 0.5rem; font-size: 0.85rem; font-weight: ${isCurrent ? '700' : '500'}; color: ${isActive ? '#1e3a8a' : '#9ca3af'}; text-align: center;">
                                    ${status}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <!-- Timeline -->
                ${application.statusHistory && application.statusHistory.length > 0 ? `
                    <div style="background: rgba(246,241,231,0.5); padding: 1.5rem; border-radius: 10px;">
                        <h4 style="margin: 0 0 1rem 0; color: #1e3a8a;"><i class="fas fa-history"></i> Timeline</h4>
                        ${application.statusHistory.map(h => `
                            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; align-items: start;">
                                <div style="width: 12px; height: 12px; border-radius: 50%; background: ${this.STATUS_COLORS[h.status]}; margin-top: 0.5rem; flex-shrink: 0;"></div>
                                <div>
                                    <div style="font-weight: 600; color: ${this.STATUS_COLORS[h.status]};">${h.status}</div>
                                    <div style="font-size: 0.85rem; color: #6b7280;">${new Date(h.timestamp).toLocaleString()}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <!-- Next Steps -->
                <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(14,165,233,0.1); border-radius: 8px; border-left: 4px solid #0ea5e9;">
                    <strong style="color: #0ea5e9;"><i class="fas fa-lightbulb"></i> Next Steps:</strong>
                    <p style="margin: 0.5rem 0 0 0; color: #1e3a8a;">
                        ${this.getNextSteps(currentStatus)}
                    </p>
                </div>
            </div>
        `;
    }
    
    static getNextSteps(status) {
        const steps = {
            'Applied': 'Your application is under review. You should hear back within 3-5 business days.',
            'Screening': 'Your profile is being screened. Prepare your resume and portfolio for the next round.',
            'Interview': 'Interview scheduled! Research the company and practice common interview questions.',
            'Offer': 'Congratulations! Review the offer details and respond within the deadline.',
            'Accepted': 'Great! Prepare for your onboarding and first day.'
        };
        return steps[status] || 'Check back for updates.';
    }
}

// Make available globally
window.StorageManager = StorageManager;
window.ProfileManager = ProfileManager;
window.RecommendationEngine = RecommendationEngine;
window.GamificationManager = GamificationManager;
window.AdvancedSearch = AdvancedSearch;
window.ApplicationTracker = ApplicationTracker;

// ==================== SHARED COMPONENTS ====================
class SharedComponents {
    static applyBaseStyles() {
        if (document.getElementById('ih-base-styles')) return;
        const style = document.createElement('style');
        style.id = 'ih-base-styles';
        style.textContent = `
          :root {
            --cream: #f6f1e7; --blue: #1e3a8a; --sea-blue: #0ea5e9;
            --primary-bg: var(--cream); --secondary-bg: #ffffff;
            --header-bg: rgba(246, 241, 231, 0.95);
            --text-primary: var(--blue); --text-secondary: rgba(30, 58, 138, 0.8);
            --accent-color: var(--sea-blue); --hover-color: var(--blue);
            --border-color: rgba(30, 58, 138, 0.15); --shadow-color: rgba(30, 58, 138, 0.12);
            --tag-bg: rgba(14, 165, 233, 0.12); --primary-gradient: linear-gradient(135deg, var(--blue), var(--sea-blue));
            --border-radius-main: 16px;
          }
          body { font-family: Inter, -apple-system, Segoe UI, Roboto, sans-serif; background: var(--primary-bg); color: var(--text-primary); }
          .ih-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
          .ih-btn { background: var(--primary-gradient); color: #fff; border: none; border-radius: 999px; padding: .8rem 1.4rem; font-weight: 700; cursor: pointer; }
          .ih-btn:hover { filter: brightness(1.05); }
          header.ih-header { background: var(--header-bg); backdrop-filter: blur(20px); padding: 1rem 0; position: sticky; top: 0; z-index: 1000; border-bottom: 2px solid var(--accent-color); box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          header .ih-nav { display: flex; justify-content: space-between; align-items: center; }
          header .ih-logo { display: flex; align-items: center; gap: 10px; font-size: 1.4rem; font-weight: 700; color: var(--text-primary); text-decoration: none; }
          header .ih-links { display: flex; gap: 1rem; align-items: center; }
          header .ih-links a { color: var(--text-secondary); text-decoration: none; font-weight: 500; }
          header .ih-links a:hover { color: var(--accent-color); }
          footer.ih-footer { margin-top: 3rem; background: #fff; border-top: 2px solid var(--border-color); }
          footer .ih-footer-inner { display: grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap: 1rem; padding: 2rem; }
          footer .ih-footer-inner a { color: var(--text-secondary); text-decoration: none; }
          footer .ih-footer-inner a:hover { color: var(--accent-color); }
        `;
        document.head.appendChild(style);
    }

    static renderHeader() {
        return `
          <header class="ih-header">
            <div class="ih-container ih-nav">
              <a href="index.html" class="ih-logo"><i class="fas fa-graduation-cap" style="color:var(--accent-color)"></i> InternHub</a>
              <nav class="ih-links">
                <a href="find-internships.html">Internships</a>
                <a href="features.html">Features</a>
                <a href="pricing.html">Pricing</a>
                <a href="testimonials.html">Testimonials</a>
                <a href="partners.html">Partners</a>
                <a href="contact.html" class="ih-btn" style="padding:.4rem .9rem">Contact</a>
              </nav>
            </div>
          </header>`;
    }

    static renderFooter() {
        return `
          <footer class="ih-footer">
            <div class="ih-container ih-footer-inner">
              <div>
                <h4 style="margin-bottom:.6rem;color:var(--text-primary)">Legal</h4>
                <a href="privacy.html">Privacy</a><br>
                <a href="terms.html">Terms</a><br>
                <a href="cookies.html">Cookies</a>
              </div>
              <div>
                <h4 style="margin-bottom:.6rem;color:var(--text-primary)">Trust</h4>
                <a href="accessibility.html">Accessibility</a><br>
                <a href="security.html">Security</a><br>
                <a href="sitemap.xml">Sitemap</a>
              </div>
              <div>
                <h4 style="margin-bottom:.6rem;color:var(--text-primary)">Company</h4>
                <a href="about.html">About</a><br>
                <a href="press.html">Press</a><br>
                <a href="media-kit.html">Media Kit</a>
              </div>
              <div>
                <h4 style="margin-bottom:.6rem;color:var(--text-primary)">Support</h4>
                <a href="faq.html">FAQ</a><br>
                <a href="resources.html">Resources</a><br>
                <a href="report-issue.html">Report an Issue</a>
              </div>
            </div>
          </footer>`;
    }

    static injectHeaderFooter() {
        this.applyBaseStyles();
        const top = document.createElement('div');
        top.innerHTML = this.renderHeader();
        document.body.insertBefore(top.firstElementChild, document.body.firstChild);
        const bottom = document.createElement('div');
        bottom.innerHTML = this.renderFooter();
        document.body.appendChild(bottom.firstElementChild);
    }
}

window.SharedComponents = SharedComponents;
