import React, { useEffect } from "react";
import { Card, Image } from "semantic-ui-react";
import { useLocation, Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";

const SearchResults = () => {
  const location = useLocation();
  const { searchStore } = useStore();
  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (query) {
      searchStore.search(query);
    }
  }, [query, searchStore]);

  console.log("Search Results:", searchStore.searchResults);

  return (
    <div>
      <h2>Search Results</h2>
      {searchStore.searchResults.eventResults.length > 0 ? (
        <Card.Group>
          {searchStore.searchResults.eventResults.map((event) => {
            const imageUrl = `${process.env.PUBLIC_URL}/assets/categoryImages/${event.category}.jpg`;
            console.log(`Image URL for ${event.title}:`, imageUrl);
            return (
              <Card key={event.id} as={Link} to={`/activities/${event.id}`}>
                <Image
                  floated="right"
                  size="mini"
                  src={imageUrl}
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>
                  ) => {
                    e.currentTarget.src = `${process.env.PUBLIC_URL}/assets/categoryImages/default.jpg`;
                  }}
                />
                <Card.Content>
                  <Card.Header>{event.title}</Card.Header>
                  <Card.Meta>{event.date}</Card.Meta>
                  <Card.Description>{event.description}</Card.Description>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      ) : (
        <p>No event results found.</p>
      )}
      {searchStore.searchResults.userResults.length > 0 ? (
        <Card.Group>
          {searchStore.searchResults.userResults.map((user) => (
            <Card key={user.id} as={Link} to={`/profiles/${user.username}`}>
              <Card.Content>
                <Card.Header>{user.username}</Card.Header>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      ) : (
        <p>Te gjitha rezultatet jane keto</p>
      )}
    </div>
  );
};

export default SearchResults;
