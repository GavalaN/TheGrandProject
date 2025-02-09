import React, { useEffect } from 'react'
import TomSelect from 'tom-select';
import '../Components/Search.css'
import 'tom-select/dist/css/tom-select.css'

export default function Useful_Things() {
useEffect(() => {
  new TomSelect("#select-beast",{
    allowEmptyOption: true,
    create: false,
    sortField: {
      field: "text",
      direction: "asc"
    }
  });
}, [])





  return (
<<<<<<< HEAD
    <div className="content">Hasznos Információk
<div class="p-4"><select id="select-beast" className='form-select' data-placeholder="Select a person..."  autocomplete="off">
				<option value="">None</option>
				<option value="4">Thomas Edison</option>
				<option value="1">Nikola</option>
				<option value="3">Nikola Tesla</option>
				<option value="5">Arnold Schwarzenegger</option>
			</select></div>
    </div>
=======
    <div className="content">Hasznos Információk</div>
>>>>>>> 3e6312538f4fd12e8a6295cf264bbc6fd1714f5c
  )
}
