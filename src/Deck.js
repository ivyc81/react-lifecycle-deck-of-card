import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import Card from './Card';
import './Deck.css';

const BASE_URL = 'https://deckofcardsapi.com/api/deck'
class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            deckId: '',
            remaining: null,
            cards: [],
        }
        this.drawCard = this.drawCard.bind(this);
    }

    async componentDidMount() {
        const response = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);

        this.newCardTimer = setInterval(async () => {
            await this.drawCard()
        }, 3000);

        this.setState({
            loading: false,
            deckId: response.data.deck_id,
            remaining: response.data.remaining
        });
    }

    async drawCard() {
        const response = await axios.get(`${BASE_URL}/${this.state.deckId}/draw/?count=1`);

        this.setState(st => {
            if (st.remaining === 0) {
                clearInterval(this.newCardTimer);
            } else {
                const cardObj = { img: response.data.cards[0].image, id: uuid() };
                const newCards = st.cards.map((card) => ({ ...card }));
                newCards.push(cardObj);

                return {
                    remaining: response.data.remaining,
                    cards: newCards,
                }
            }
        });

    }

    renderCards() {
        return (
            this.state.cards.map((card) =>
                <Card key={card.id} imageUrl={card.img} />)
        )
    }

    componentWillUnmount() {

    }

    render() {
        const cards = this.renderCards();
        return (
            <div className="Deck">
                <div className="Deck-top">
                    <h1>Deck of cards</h1>
                    {this.state.loading && <div>Shuffling ...</div>}
                    {/* { this.state.remaining
                        ? <button onClick={ this.drawCard }>Give me a card</button>
                        : null
                    } */}
                </div>
                <div className="Deck-cards">
                    {cards}
                </div>
            </div>
        );
    }
}

export default Deck;