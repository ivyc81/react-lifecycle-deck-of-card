import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import Card from './Card';
// import './Deck.css';

const BASE_URL = 'https://deckofcardsapi.com/api/deck'
class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            deckId:'',
            remaining: 0,
            cards: [],
        }
        this.drawCard = this.drawCard.bind(this);
    }

    async componentDidMount() {
        const response = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);


        this.setState({
            loading: false,
            deckId: response.data.deck_id,
            remaining: response.data.remaining});
    }

    async drawCard() {
        const response = await axios.get(`${BASE_URL}/${this.state.deckId}/draw/?count=1`);

        const cardObj = { img: response.data.cards[0].image, id: uuid() };

        const newCards = this.state.cards.map((card) => ({...card}));

        newCards.push(cardObj);
        // const newCardImages = [...this.state.cardImages, response.data.cards[0].image];

        // const newCardIds = [...this.state.cardIds, uuid()];

        this.setState({
            remaining: response.data.remaining,
            cards: newCards,
        })
    }

    renderCards() {
        return(
            this.state.cards.map((card)=>
            <Card key={ card.id } imageUrl={ card.img }/>)
        )
    }

    render() {
        const cards = this.renderCards();
        return (
            <div className="Deck">
                <h1>Deck of cards</h1>
                { this.state.loading && <div>Shuffling ...</div> }
                { this.state.remaining
                    ? <button onClick={ this.drawCard }>Give me a card</button>
                    : null
                }
                { cards }
            </div>
        );
    }
}

export default Deck;