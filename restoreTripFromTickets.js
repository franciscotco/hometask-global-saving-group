const sliceTickets = (tickets, ticketIndex) => [...tickets.slice(0, ticketIndex), ...tickets.slice(ticketIndex + 1, tickets.length)];

const sortTickets = (tickets, ticket, sortedTickets) => {
  if (tickets.length === 0) {
    return [...sortedTickets, ticket];
  } else {
    for (let ticketIndex = 0; ticketIndex < tickets.length; ticketIndex += 1) {
      if (tickets[ticketIndex].source === ticket.destination) {
        return sortTickets(sliceTickets(tickets, ticketIndex), tickets[ticketIndex], [...sortedTickets, ticket]);
      }
    }
    return sortedTickets;
  }
};

const formatTrip = (tickets) => {
  const lastTicket = tickets.at(-1);

  if (lastTicket) {
    return [...tickets.map(({ source }) => source), lastTicket.destination].join(", ");
  } else {
    return null;
  }
};

export const restoreTripFromTickets = (tickets) => {
  if (tickets.length === 0) {
    return null;
  } else {
    for (let ticketIndex = 0; ticketIndex < tickets.length; ticketIndex += 1) {
      const sortedTickets = sortTickets(sliceTickets(tickets, ticketIndex), tickets[ticketIndex], []);

      if (sortedTickets.length === tickets.length) {
        return formatTrip(sortedTickets);
      }
    }
    return null;
  }
};
