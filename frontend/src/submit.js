// submit.js
import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

export const SubmitButton = () => {
    const { getNodes, getEdges } = useReactFlow();

    const handleSubmit = useCallback(async () => {
        const nodes = getNodes();
        const edges = getEdges();

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes,
                    edges: edges
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Display alert with the results
            alert(`Pipeline Analysis Results:
            
Number of Nodes: ${result.num_nodes}
Number of Edges: ${result.num_edges}
Is DAG: ${result.is_dag ? 'Yes' : 'No'}${result.error ? '\nError: ' + result.error : ''}`);

        } catch (error) {
            alert(`Error submitting pipeline: ${error.message}`);
        }
    }, [getNodes, getEdges]);

    return (
        <button className="submit-button" type="button" onClick={handleSubmit}>
            Submit Pipeline
        </button>
    );
}
