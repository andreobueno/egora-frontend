import React from 'react';
import agora from '../assets/images/agora.jpg';

const Home = () => (
  <div className="main-content home">
    <h2>E-gora Support Tool</h2>
    <h3>
      This is a tool to support at applying the Group Governance Model (GGM) framework on a virtual
      community in order to create and manage an E-gora.
    </h3>
    <p align="justify">
      In ancient Greek city-states, population would choose a public space to discuss the city
      management together. Those places were called Agora. The literal meaning of the word is
      “gathering place” or “assembly”. Back then, Agoras were the center of the athletic, artistic,
      commercial, spiritual and political life of the city.
    </p>
    <p align="center">
      <img src={agora} alt="Agora from Greece" height="300px" width="500px" />
    </p>

    <p align="justify">
      This model of city governance supported by the Agoras is known as Direct Democracy, where
      citizens (overage men from Greece) propose and vote for city management strategies. However,
      once cities started becoming bigger, they went from city of neighbors (small cities) to city
      of strangers (big cities). Then, communication between citizens became a problem, because the
      larger the population, the weaker communication ties between residents.
    </p>
    <p align="justify">
      In this scenario, a new gap emerged, where someone needed to become the coordinator to help
      with citizens communication and, also, take decisions on their behalf whenever necessary due
      to time constraints. Since then, government has been the one acting on that role, changing the
      previous horizontal government model to a top-down urban system where citizens tend not to
      participate in the city management, but rather follow/obey to whatever the politicians decide
      for them. As a result, Direct Democracy was replaced by the &quot;Representative
      Democracy&quot;. Nonetheless, this type of government faces constant complaints from citizens,
      especially in poor/underdeveloped countries, where corruption among the governors has become
      quite common. In addition to corruption, this government model also discourages citizens&#39;
      participation on the city management.
    </p>
    <p align="justify">
      Now, with the advent of the Internet and the popularization of mobile devices, communication
      is not a problem anymore. It became easier and faster for citizens to inform themselves about
      politics and, whenever necessary, to strike back at the politicians&#39; actions being taken
      on their behalf.
    </p>
    <p align="justify">
      An
      {' "E-gora" '}
      is a virtual community that aims at recreating in the virtual world the extint Agoras.
    </p>

    <hr />
    <h3 align="center">
      If you have any doubts, please, feel free to contact
      <a style={{ border: 'none' }} href="mailto:andre.obueno@dc.ufscar.br">
        andre.obueno@dc.ufscar.br.
      </a>
    </h3>
  </div>
);

export default Home;
