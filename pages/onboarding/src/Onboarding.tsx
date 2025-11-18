import { withErrorBoundary, withSuspense } from '@extension/shared';
import { ErrorDisplay, LoadingSpinner } from '@extension/ui';
import '@src/Onboarding.css';

const Onboarding = () => (
  <div className="onboarding-container">
    <div className="onboarding-content">
      <div className="header-section">
        <div className="icon-container">
          <img src="/icon-128.png" alt="ReWrite" className="app-icon" />
        </div>
        <h1 className="title">Welcome to ReWrite! 🎉</h1>
        <p className="subtitle">Your AI-powered grammar assistant</p>
      </div>

      <div className="pin-section">
        <h2 className="section-title">📌 Pin Extension for Quick Access</h2>
        <p className="section-description">Keep ReWrite easily accessible by pinning it to your browser toolbar:</p>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3 className="step-title">Click the Extensions icon</h3>
              <p className="step-description">
                Look for the puzzle piece icon <span className="emoji">🧩</span> in the top-right corner of your browser
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3 className="step-title">Find ReWrite</h3>
              <p className="step-description">Locate "ReWrite" in the extensions dropdown menu</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3 className="step-title">Pin it!</h3>
              <p className="step-description">
                Click the pin icon <span className="emoji">📌</span> next to ReWrite
              </p>
            </div>
          </div>
        </div>

        <div className="visual-hint">
          <div className="hint-box">
            <p className="hint-text">
              <span className="emoji">💡</span> <strong>Pro tip:</strong> Once pinned, click the ReWrite icon anytime to
              fix grammar instantly!
            </p>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">✨ What You Can Do</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✍️</div>
            <h3 className="feature-title">Fix Grammar</h3>
            <p className="feature-description">Instantly correct grammar, spelling, and punctuation errors</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Fast & Easy</h3>
            <p className="feature-description">One-click corrections powered by AI</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Private</h3>
            <p className="feature-description">Your text stays secure and private</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <button className="cta-button" onClick={() => window.close()}>
          Get Started
        </button>
        <p className="cta-hint">You can close this tab and start using ReWrite!</p>
      </div>
    </div>
  </div>
);

export default withErrorBoundary(withSuspense(Onboarding, <LoadingSpinner />), ErrorDisplay);
