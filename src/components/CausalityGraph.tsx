import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useApp } from '../context/AppContext';

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  title: string;
  category: string;
  status: string;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

interface Props {
  height?: number;
  onNodeClick?: (id: string) => void;
  focusedId?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  violence: '#C41E3A',
  legal: '#B45309',
  shutdown: '#1D4ED8',
  statement: '#6D28D9',
  other: '#374151',
};

export default function CausalityGraph({ height = 600, onNodeClick, focusedId }: Props) {
  const { state } = useApp();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 800;
    const h = height;

    const nodes: GraphNode[] = state.incidents.map((inc) => ({
      id: inc.id,
      title: inc.title,
      category: inc.category,
      status: inc.status,
    }));

    const links: GraphLink[] = [];
    state.incidents.forEach((inc) => {
      inc.ledTo.forEach((target) => {
        links.push({ source: inc.id, target });
      });
    });

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', width).attr('height', h);

    const g = svg.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    svg.call(zoom);

    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 25)
      .attr('refY', 0)
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#DDD8CE');

    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links).id((d) => d.id).distance(140))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, h / 2))
      .force('collision', d3.forceCollide(60));

    const linkEl = g.append('g')
      .selectAll<SVGLineElement, GraphLink>('line')
      .data(links)
      .join('line')
      .attr('stroke', '#DDD8CE')
      .attr('stroke-width', 1.5)
      .attr('marker-end', 'url(#arrow)');

    const nodeEl = g.append('g')
      .selectAll<SVGGElement, GraphNode>('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, GraphNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      .on('click', (_event, d) => {
        onNodeClick?.(d.id);
      });

    nodeEl.append('circle')
      .attr('r', (d) => (d.id === focusedId ? 20 : 14))
      .attr('fill', (d) => CATEGORY_COLORS[d.category] || '#374151')
      .attr('stroke', (d) => (d.id === focusedId ? '#1A1A1A' : 'transparent'))
      .attr('stroke-width', 2)
      .attr('opacity', (d) => (focusedId && d.id !== focusedId ? 0.4 : 1));

    nodeEl.append('text')
      .attr('dy', '30px')
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Inter, system-ui, sans-serif')
      .attr('font-size', '10px')
      .attr('fill', '#1A1A1A')
      .attr('font-weight', '600')
      .text((d) => d.id);

    nodeEl.append('title').text((d) => d.title);

    simulation.on('tick', () => {
      linkEl
        .attr('x1', (d) => (d.source as GraphNode).x ?? 0)
        .attr('y1', (d) => (d.source as GraphNode).y ?? 0)
        .attr('x2', (d) => (d.target as GraphNode).x ?? 0)
        .attr('y2', (d) => (d.target as GraphNode).y ?? 0);

      nodeEl.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, [state.incidents, height, focusedId, onNodeClick]);

  return (
    <div ref={containerRef} style={{ width: '100%', height, overflow: 'hidden' }}>
      <svg
        ref={svgRef}
        style={{ width: '100%', height: '100%' }}
        aria-label="Causality web graph showing incident relationships"
        role="img"
      />
    </div>
  );
}
