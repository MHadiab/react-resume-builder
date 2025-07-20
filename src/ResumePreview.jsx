import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './preview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';


function ResumePreview({ personalDetails, educationEntries, experienceEntries, color ,layout}) {
  const resumeStyles = {
    backgroundColor: color,
    color: 'white',
  };
  return (
    <div className={`resume layout-${layout}`} >
      {/* header */}
      <header className="resume-header" style={resumeStyles}>
        <h1>{personalDetails.name || 'Your Name'}</h1>
        <div className='call_info'>
            <p>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '9px' ,position: 'relative', top: '1px' }} />
              {personalDetails.email || 'your.email@example.com'}
            </p>
            <p>
                <FontAwesomeIcon icon={faPhone} style={{ marginRight: '9px' }} />
                {personalDetails.phone || 'Your Phone Number'}
            </p>
            <p>
                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '9px' ,position: 'relative', top: '1px'}} />
                {personalDetails.address || 'Your Address'}
            </p>
        </div>
      </header>

      <main className='resume-body'>
      {/* education */}
      {educationEntries.length > 0 && educationEntries[0].school && (
        <section className="resume-section">
          <h2 className='education-title' style={resumeStyles}>Education</h2>
          {educationEntries.map(edu => (
            <div key={edu.id} className="resume-item">
              <div className="time_info">
                <p>{edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}</p>
                <p>{edu.location || 'Country,City'}</p>
              </div>
              <div className="more_info">
                <p className='company'>{edu.school || 'School Name'}</p>
                <p>{edu.degree || 'Degree'}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* experience */}
      {experienceEntries.length > 0 && experienceEntries[0].companyName && (
        <section className="resume-section">
          <h2 className='experience-title' style={resumeStyles}>Experience</h2>
          {experienceEntries.map(exp => (
            <div key={exp.id} className="resume-item">
              <div className="time_info">
                <p>{exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}</p>
                <p>{exp.location || 'Country,City'}</p>
              </div>
              <div className="more_info">
                <p className='company'>{exp.companyName || 'Company Name'}</p>
                <p className='position'>{exp.position || 'Position'}</p>
                <p>{exp.description || 'Job description...'}</p>
              </div>
            </div>
          ))}
        </section>
      )}
      </main>

    </div>
  );
}

export default ResumePreview;