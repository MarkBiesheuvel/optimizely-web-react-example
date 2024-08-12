'use client'

import { useState, useEffect } from 'react';
import { Row, Card, Col, Button, Badge, Tabs, Tab } from 'react-bootstrap';

// Type declaration of setOptimizelyVariation
declare global {
  interface Window { setOptimizelyVariation: (variation: string) => void }
}

// Type declaration of a product
interface Product {
  title: string;
  description: string;
  url: string;
}

const ProductContainerA: React.FC<{products: Product[]}> = ({ products }) => {
  return (<>
    <Row>
      {products.map(({title, description, url}, index) => (
        <Col sm={4} key={index}>
          <Card>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Card.Link href={url} target='_blank'>
                <Button variant="success">Visit website</Button>
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </>)
}

const ProductContainerB: React.FC<{products: Product[]}> = ({ products }) => {
  return (
    <Row>
      <Col sm={8}>
        <Tabs className="mb-3">
          {products.map(({title, description, url}, index) => (
            <Tab key={index} eventKey={index} title={title}>
              {description}
            </Tab>
          ))}
        </Tabs>
      </Col>
    </Row>
  )
}

export default () => {
  const [variation, setVariation] = useState('A');

  useEffect(() => {
    // Expose the update function of the hook to the Window object so it can be used by Optimizely
    window.setOptimizelyVariation = setVariation;
  })

  const products: Product[] = [
    {
      title:'Optimizely Web Experimentation',
      description:'Optimizely Web Experimentation is a platform that allows you to experiment via A/B or multi-variant testing on any channel or device with an internet connection.',
      url: 'https://www.optimizely.com/products/web-experimentation/',
    },
    {
      title:'Next.js by Vercel',
      description:'Next.js is an open-source web development framework created by the private company Vercel providing React-based web applications with server-side rendering and static website generation.',
      url: 'https://nextjs.org/',
    },
    {
      title:'Bootstrap',
      description:'Powerful, extensible, and feature-packed frontend toolkit. Build and customize with Sass, utilize prebuilt grid system and components, and bring projects to life with powerful JavaScript plugins.',
      url: 'https://getbootstrap.com/',
    }
  ]

  // Switch between component A and B based on the variation
  let ProductContainer;
  switch(variation) {
    case 'A':
      ProductContainer = ProductContainerA
      break;
    case 'B':
      ProductContainer = ProductContainerB
      break;
      default:
        throw 'Invalid variation'
  }

  return (
      <>
        <h1>Example</h1>
        <h5>Current variation: <Badge pill bg="secondary">{variation}</Badge></h5>
        <ProductContainer products={products}/>
      </>
  );
}
