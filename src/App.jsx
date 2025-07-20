import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ResumePreview from './ResumePreview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines,faPenToSquare} from '@fortawesome/free-solid-svg-icons';

export default function InfoContainer() {

  const [activeForm, setActiveForm] = useState('Content');

  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [educationEntries, setEducationEntries] = useState([
    { id: 1, school: '', degree: '', startDate: '', endDate: '', location: '' },
  ]);

  const [experienceEntries, setExperienceEntries] = useState([
    { id: 1, companyName: '', position: '', startDate: '', endDate: '', location: '', description: '' },
  ]);

  const [selectedColor, setSelectedColor] = useState('#113378ff'); 


  const [selectLayout, setSelectedLayout] = useState('top');


  // ------------ HANDLERS ------------


  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleEducationChange = (index, event) => {
    const newEntries = [...educationEntries];
    newEntries[index][event.target.name] = event.target.value;
    setEducationEntries(newEntries);
  };

  const addEducationEntry = () => {
    setEducationEntries([
      ...educationEntries,
      { id: Date.now(), school: '', degree: '', startDate: '', endDate: '', location: '' }, // استفاده از Date.now() برای id منحصر به فرد
    ]);
  };

  const removeEducationEntry = (index) => {
    const newEntries = educationEntries.filter((_, i) => i !== index);
    setEducationEntries(newEntries);
  };

  const handleExperienceChange = (index, event) => {
    const newEntries = [...experienceEntries];
    newEntries[index][event.target.name] = event.target.value;
    setExperienceEntries(newEntries);
  };

  const addExperienceEntry = () => {
    setExperienceEntries([
      ...experienceEntries,
      { id: Date.now(), companyName: '', position: '', startDate: '', endDate: '', location: '', description: '' },
    ]);
  };

  const removeExperienceEntry = (index) => {
    const newEntries = experienceEntries.filter((_, i) => i !== index);
    setExperienceEntries(newEntries);
  };


  const getButtonClasses = (formKey) => {
    return activeForm === formKey ? "active" : "";
  };

  return (
    <div className='resume-maker'>
      <div className="nav">
        <ul className="settings">
          <li>
            <button onClick={() => setActiveForm('Content')} className={getButtonClasses('Content')} style={{display: 'block'}}>
              <FontAwesomeIcon icon={faFileLines} className='fonta' />
              Content
            </button>
          </li>
          <li>
            <button onClick={() => setActiveForm('Customize')} className={getButtonClasses('Customize')} style={{display: 'block'}}>
              <FontAwesomeIcon icon={faPenToSquare} className='fontb' />
              Customize
            </button>
          </li>
        </ul>
      </div>

      <div className="info">
        {activeForm === 'Content' && (
          <FormA
            personalDetails={personalDetails}
            setPersonalDetails={setPersonalDetails}
            educationEntries={educationEntries}
            experienceEntries={experienceEntries}
            onEducationChange={handleEducationChange}
            onAddEducation={addEducationEntry}
            onRemoveEducation={removeEducationEntry}
            onExperienceChange={handleExperienceChange}
            onAddExperience={addExperienceEntry}
            onRemoveExperience={removeExperienceEntry}
          />
        )}
        {activeForm === 'Customize' && <FormB
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          handleColorChange={handleColorChange}
          setSelectedLayout={setSelectedLayout}
        />}
      </div>
        <ResumePreview
          personalDetails={personalDetails}
          educationEntries={educationEntries}
          experienceEntries={experienceEntries}
          color={selectedColor} 
          setSelectedColor={setSelectedColor}
          layout={selectLayout}
        />
    </div>
  );
}

function FormA({
  personalDetails, setPersonalDetails,
  educationEntries, onEducationChange, onAddEducation, onRemoveEducation,
  experienceEntries, onExperienceChange, onAddExperience, onRemoveExperience
}) {
  return (
    <div className="accordion" id="accordionExample">
      {/* Card 1: Personal Details */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button className="accordion-button rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Personal Details
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <div className='mb-4 p-3 border rounded position-relative'>
              <form id='personal-data'>
              <label htmlFor="name">Full name</label>
              <input className="form-control" type="text" id='name' placeholder='First and Last name' value={personalDetails.name} onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })} />
              <label htmlFor="email">Email</label>
              <input className="form-control" type="text" id='email' placeholder='Enter Email' value={personalDetails.email} onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value})} />
              <label htmlFor="phone">Phone Number</label>
              <input className="form-control" type="text" id='phone' placeholder='Enter Phone Number' value={personalDetails.phone} onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value})} />
              <label htmlFor="address">Address</label>
              <input className="form-control" type="text" id='address' placeholder='Enter Address' value={personalDetails.address} onChange={(e) => setPersonalDetails({ ...personalDetails, address: e.target.value})} />
            </form>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Education */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button className="accordion-button collapsed rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Education
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            {educationEntries.map((entry, index) => (
              <div key={entry.id} className="mb-4 p-3 border rounded position-relative">
                {educationEntries.length > 1 && (
                  <button type="button" className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center" onClick={() => onRemoveEducation(index)}>
                    &times;
                  </button>
                )}
                <form className="education-entry-form">
                    <label htmlFor={`school-${entry.id}`}>School</label>
                    <input className="form-control" type="text" id={`school-${entry.id}`} name="school" value={entry.school} onChange={(e) => onEducationChange(index, e)} placeholder='Enter School/ University' />

                    <label htmlFor={`degree-${entry.id}`}>Degree</label>
                    <input className="form-control" type="text" id={`degree-${entry.id}`} name="degree" value={entry.degree} onChange={(e) => onEducationChange(index, e)} placeholder='Enter Degree / Field of Study' />
                    
                    <div class="date-group">
                      <div class="date-item">
                        <label htmlFor={`ed-start-date-${entry.id}`}>Start Date</label>
                        <input className="form-control" type="text" id={`ed-start-date-${entry.id}`} placeholder="2025/11/8" value={entry.startDate} onChange={(e) => onEducationChange(index, e)} name='startDate'/>
                      </div>
                      <div class="date-item">
                        <label htmlFor={`ed-end-date-${entry.id}`}>End Date</label>
                        <input className="form-control" type="text" id={`ed-end-date-${entry.id}`} placeholder="present"  value={entry.endDateDate} onChange={(e) => onEducationChange(index, e)} name='endDate'/>
                      </div>
                    </div>
                    <label htmlFor={`location-${entry.id}`}>Location</label>
                    <input className="form-control" type="text" id={`location-${entry.id}`} name="location" value={entry.location} onChange={(e) => onEducationChange(index, e)} placeholder='City, Countrty'/> 
                </form>
              </div>
            ))}
            <button type="button" className="btn btn-primary w-100 mt-2" onClick={onAddEducation}>
              + Add Education
            </button>
          </div>
        </div>
      </div>

      {/* Card 3: Experience */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button className="accordion-button collapsed rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Experience
          </button>
        </h2>
        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            {experienceEntries.map((entry, index) => (
              <div key={entry.id} className="mb-4 p-3 border rounded position-relative">
                {experienceEntries.length > 1 && (
                  <button type="button" className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center" onClick={() => onRemoveExperience(index)}>
                    &times;
                  </button>
                )}
                <form className="experience-entry-form">
                    <label htmlFor={`company-name-${entry.id}`}>Company Name</label>
                    <input className="form-control" type="text" id={`company-name-${entry.id}`} name="companyName" value={entry.companyName} onChange={(e) => onExperienceChange(index, e)} placeholder='Enter Company Name' />
                    
                    <label htmlFor={`position-${entry.id}`}>Position Title</label>
                    <input className="form-control" type="text" id={`position-${entry.id}`} name="position" value={entry.position} onChange={(e) => onExperienceChange(index, e)} placeholder='Enter Position Title' />

                    <div class="date-group">
                      <div class="date-item">
                        <label htmlFor={`ex-start-date-${entry.id}`}>Start Date</label>
                        <input className="form-control" type="text" id={`ex-start-date-${entry.id}`} placeholder="2025/11/8" value={entry.startDate} onChange={(e) => onExperienceChange(index, e)} name='startDate'/>
                      </div>
                      <div class="date-item">
                        <label htmlFor={`ex-end-date-${entry.id}`}>End Date</label>
                        <input className="form-control" type="text" id={`ex-end-date-${entry.id}`} placeholder="present"  value={entry.endDate} onChange={(e) => onExperienceChange(index, e)} name='endDate'/>
                      </div>
                    </div>
                    <label htmlFor={`ex-location-${entry.id}`}>Location</label>
                    <input className="form-control" type="text" id={`ex-location-${entry.id}`} name="location" value={entry.location} onChange={(e) => onExperienceChange(index, e)} placeholder='City, Countrty'/> 

                    <label htmlFor={`ex-description-${entry.id}`}>Description</label>
                    <textarea className="form-control" id={`ex-description-${entry.id}`} name="description" value={entry.description} onChange={(e) => onExperienceChange(index, e)} placeholder="Enter Description"></textarea>
                    
                </form>
              </div>
            ))}
            <button type="button" className="btn btn-primary w-100 mt-2" onClick={onAddExperience}>
              + Add Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormB({ selectedColor, handleColorChange , setSelectedLayout }) {
  return (
    <div className="formb">
      <form>
      <h2>Color</h2>
      <label htmlFor="color-input">choose your theme</label>
      <input
        type="color"
        id="color-input"
        value={selectedColor} 
        onChange={(e) => handleColorChange(e)} 
      />
    </form>
    <div className='layout-form'>
      <h2>Layout</h2>
      <button className='column-layout-btn' style={{borderColor: selectedColor}} onClick={() => setSelectedLayout('top')}></button>
      <button className='row-layout-btn' style={{borderColor: selectedColor}} onClick={() => setSelectedLayout('left')}></button>
      <button className='row-reverse-layout-btn' style={{borderColor: selectedColor}} onClick={() => setSelectedLayout('right')}></button>
    </div>
    </div>
  );
}
