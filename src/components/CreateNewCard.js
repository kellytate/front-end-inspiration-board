import React, { useState } from 'react';

const kDefaultFormState = {
  message: '',
};



const CreateNewCard = ( {onCardDataReady }) => {
  const [formField, setFormField] = useState(kDefaultFormState);

  const formSubmit = (event) => {
    event.preventDefault();
    onCardDataReady(formField);
    setFormField(kDefaultFormState);
  };

  const onMessageChange = (event) => {
    setFormField({message: event.target.value});
  };

  return (
    <section>
      <div>
        <h2>CREATE A NEW CARD</h2>
      </div>
      <div>
        <form onSubmit={formSubmit}>
          <div>
            <input
              type='text'
              name='message'
              value={formField.message}
              onChange={onMessageChange}
              ></input>
            <input type='submit' value='Submit'></input>
          </div>
        </form>
      </div>
      <div>
        <p>preview: {formField.message}
        </p>

      </div>
    </section>
  );
};
export default CreateNewCard;