import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

class SupabaseMCPClient {
  private client: Client | null = null;
  private transport: StdioClientTransport | null = null;

  async connect() {
    try {
      // Create transport using the same configuration as .mcp.json
      this.transport = new StdioClientTransport({
        command: "npx",
        args: [
          "-y", 
          "@supabase/mcp-server-supabase@latest",
          "--access-token",
          "sbp_9df67c84bdac115f7be5b6b0e82e4bd497f6415a"
        ]
      });

      this.client = new Client(
        {
          name: "bauhaus-brutalism-app",
          version: "1.0.0",
        },
        {
          capabilities: {
            tools: {},
          },
        }
      );

      await this.client.connect(this.transport);
      
      console.log("Connected to Supabase MCP server");
      return true;
    } catch (error) {
      console.error("Failed to connect to MCP server:", error);
      return false;
    }
  }

  async listTools() {
    if (!this.client) {
      await this.connect();
    }
    
    try {
      const response = await this.client?.listTools();
      return response?.tools || [];
    } catch (error) {
      console.error("Failed to list tools:", error);
      return [];
    }
  }

  async callTool(name: string, arguments_: any) {
    if (!this.client) {
      await this.connect();
    }
    
    try {
      const response = await this.client?.callTool({
        name,
        arguments: arguments_
      });
      return response;
    } catch (error) {
      console.error("Failed to call tool:", error);
      throw error;
    }
  }

  async disconnect() {
    if (this.client && this.transport) {
      await this.client.close();
      this.transport = null;
      this.client = null;
    }
  }
}

export const supabaseMCP = new SupabaseMCPClient();