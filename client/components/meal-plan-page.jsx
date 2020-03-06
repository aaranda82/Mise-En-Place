import React from 'react';
import TopBar from './top-bar';
import { Link } from 'react-router-dom';
import NavBar from './nav-bar';
import Swal from 'sweetalert2';
export default class MealPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mealPlan: []
    };
    this.deleteMealPlan = this.deleteMealPlan.bind(this);
  }

  componentDidMount() {
    this.getMealPlan();
  }

  getMealPlan() {
    const init = {
      method: 'GET'
    };
    fetch('/api/mealplan', init)
      .then(response => response.json())
      .then(data => {
        this.setState(state => ({ mealPlan: data }));
      });
  }

  deleteMealPlan(recipeId) {
    const init = {
      method: 'DELETE'
    };
    fetch(`/api/mealplan/${recipeId}`, init)
      .then(() => {
        const tempState = [...this.state.mealPlan];
        for (let i = 0; i < tempState.length; i++) {
          if (tempState[i].recipeId === recipeId) {
            tempState.splice(i, 1);
          }
        }
        Swal.fire('Meal plan successfully deleted!');
        this.setState({ mealPlan: tempState });
      });
  }

  render() {
    const data = this.state.mealPlan;
    const display = data.map((element, index) =>
      (<MealPlanRecipe
        key={index}
        recipe={element}
        delete={this.deleteMealPlan}
      />));
    return (
      <React.Fragment>
        <TopBar mealPlanIcon={true} addRecipeIcon={true} title={'Meal Plan'} />
        <div className="recipes-container">
          {display}
        </div>
        <NavBar />
      </React.Fragment>
    );
  }
}

function MealPlanRecipe(props) {
  const image = props.recipe.image ? props.recipe.image : '/images/new-logo.png';
  return (

    <div className="card">
      <img src="https://img.icons8.com/ios-filled/100/000000/delete-forever.png" className="meal-plan-close" onClick={() => { props.delete(props.recipe.recipeId); }} />
      <div className="card-body row">
        <div className="col-6">
          <Link to={`/recipe-detail-page/${props.recipe.recipeId}`}>
            <p className="card-title text-primary">{props.recipe.recipeName}</p>
          </Link>
          <div className="card-text">
            <div className="category-serving">
              <h5>Category: {props.recipe.category}</h5>
              <h5>Serving: {props.recipe.numberOfServings}</h5>
            </div>
          </div>
        </div>
        <img className="pictureMealPlan col-6" src={image} />
      </div>
    </div >

  );
}
