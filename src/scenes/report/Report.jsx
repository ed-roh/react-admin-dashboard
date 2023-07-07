import React from 'react'
import "./Report.css"


function Report() {
  return (

    <div className='mainClass'>
        <div className='heading'>
            <h2>Total Questions <span>40</span> <span>Maximum Time <span>60 Minutes</span></span></h2>
        </div>
        <div className='form-control SELECT'>
        <label for="Students">Show</label>
        <select id="top-10" name="students">
        <option value="one">1</option>
        <option value="two">2</option>
        <option value="three">3</option>
        <option value="four">4</option>
        <option value="five">5</option>
        <option value="six">6</option>
        <option value="seven">7</option>
        <option value="eight">8</option>
        <option value="nine">9</option>
        <option value="ten">10</option>
        
    </select>
    <label for="Students">entries</label>
    </div>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">RANK</th>
      <th scope="col">NAME</th>
      <th scope="col">MARK OBTAINED</th>
      <th scope="col">CORRECT</th>
      <th scope="col">INCORRECT</th>
      <th scope="col">SKIPPED</th>
      <th scope="col">TOTAL TIME</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Ram kumar</td>
      <td>68</td>
      <td>25</td>
      <td>11</td>
      <td>5</td>
      <td>45<span>m</span></td>
      
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Mohan</td>
      <td>70</td>
      <td>24</td>
      <td>22</td>
      <td>5</td>
      <td>40<span>m</span></td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Sohan</td>
      <td>80</td>
      <td>23</td>
      <td>11</td>
      <td>4</td>
      <td>39<span>m</span></td>
    </tr>
  </tbody>
</table>
    </div>
    
  )
}



export default Report;
