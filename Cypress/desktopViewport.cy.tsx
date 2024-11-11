import { isOutOfBounds, hasVerticalScroll, hasHorizontalScroll, getWindowBounds, determinePairAlignment, determinePairLayout, Layout, Alignment } from '../helpers';

describe('Component: Component1 - Desktop (1366x768) Viewport ', () => {
  let layout: Layout;
  let alignment: Alignment;

    beforeEach(() => {
      cy.visit('http://localhost:6006/iframe.html?globals=&args=&id=components-component1--primary&viewMode=story');
      cy.viewport(1366, 768);
    });
      
  
    it('Text: Automate, Standardize', () => {
      cy.get('[data-testid="c3e9a7"]').then((elements) => {
        const element = elements[0];
        const rect = element.getBoundingClientRect();

        expect(window.getComputedStyle(element).fontSize, 'Font size is wrong').to.be.equal('32px');
        expect(window.getComputedStyle(element).fontFamily.split(',')[0]).to.be.equal('futura');
        expect(window.getComputedStyle(element).fontWeight.split(',')[0]).to.be.equal('700');
        expect(Math.round(Number(window.getComputedStyle(element).lineHeight.split("px")[0]))+'px').to.be.equal('43px');
        expect(window.getComputedStyle(element).color).to.be.equal('rgb(0, 0, 0)');
        expect(Math.round(rect.x + window.scrollX)).to.be.equal(189);
        expect(Math.round(rect.y + window.scrollY)).to.be.equal(78);
        
        cy.window().then((win) => {
          const windowBounds = getWindowBounds(win);
          const windowOverflow = isOutOfBounds(rect, windowBounds);
          expect(windowOverflow).to.be.false;
        });
        

        cy.document().then((document) => {
          const hasScrollInPage = hasVerticalScroll(document) || hasHorizontalScroll(document);
          expect(false).to.equal(hasScrollInPage, "There isn't a scrollable element inside the page");
        });

        cy.get('[data-testid=sh3bas]').then(($container) => {
            const containerRect = $container[0].getBoundingClientRect();
            const isCropped = isOutOfBounds(rect, containerRect);
            expect(isCropped).to.be.false;
        });
      });
    });
  
    it('Text: Save time, ensure accuracy', () => {
      cy.get('[data-testid="jj3id3"]').then((elements) => {
        const element = elements[0];
        const rect = element.getBoundingClientRect();

        expect(window.getComputedStyle(element).fontSize).to.be.equal('24px');
        expect(window.getComputedStyle(element).fontFamily.split(',')[0]).to.be.equal('futura');
        expect(window.getComputedStyle(element).fontWeight.split(',')[0]).to.be.equal('500');
        expect(Math.round(Number(window.getComputedStyle(element).lineHeight.split("px")[0]))+'px').to.be.equal('32px');
        expect(window.getComputedStyle(element).color).to.be.equal('rgb(200, 200, 200)');
        expect(Math.round(rect.x + window.scrollX)).to.be.equal(189);
        expect(Math.round(rect.y + window.scrollY)).to.be.equal(204); 

        cy.window().then((win) => {
          const windowBounds = getWindowBounds(win);
          const windowOverflow = isOutOfBounds(rect, windowBounds);
          expect(windowOverflow).to.be.false;
        });

        cy.document().then((document) => {
          const hasScrollInPage = hasVerticalScroll(document) || hasHorizontalScroll(document);
          expect(false).to.equal(hasScrollInPage, "There isn't a scrollable element inside the page");
        });

        cy.get('[data-testid=sh3bas]').then(($container) => {
            const containerRect = $container[0].getBoundingClientRect();
            const isCropped = isOutOfBounds(rect,containerRect);
            expect(isCropped).to.be.false;
        });
      });

      cy.get('[data-testid="c3e9a7"]').then(($el1) => {
        const rect1 = $el1[0].getBoundingClientRect();
      
        cy.get('[data-testid="jj3id3"]').then(($el2) => {
          const rect2 = $el2[0].getBoundingClientRect();
          layout = determinePairLayout(rect1,rect2);
          alignment = determinePairAlignment(rect1,rect2,layout);
        });
      });      
    });
  });
  