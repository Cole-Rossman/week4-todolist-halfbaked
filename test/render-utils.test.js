import { renderTodo } from '../render-utils.js';

const test = QUnit.test;

test('renderTodo should render an li with information and a complete class', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = `<li class="complete">Take out the trash</li>`;
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderTodo({ description: 'Take out the trash', complete: true });

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});
