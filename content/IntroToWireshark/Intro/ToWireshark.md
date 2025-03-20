# Intro to Wireshark


Securing Tech Lab - Getting acquainted with Wireshark

In Wireshark, you can use various display filters, which are essentially tags or expressions, to investigate network traffic. When investigating network traffic for potential security incidents, you should look out for Indicators of Compromise (IOCs) and signs of suspicious or malicious activity. Here are some common display filters and IOCs to look for in Wireshark:

**Display Filters in Wireshark:**

1. **Filter by IP Address:**
   - To filter traffic for a specific IP address, use `ip.addr == X.X.X.X`.

2. **Filter by Port Number:**
   - To filter traffic on a specific port, use `tcp.port == PortNumber` or `udp.port == PortNumber`.

3. **Filter by Protocol:**
   - To filter traffic by a specific protocol, use `http` for HTTP traffic, `dns` for DNS traffic, etc.

4. **Filter by Source or Destination:**
   - You can filter by source or destination IP addresses using `ip.src == X.X.X.X` or `ip.dst == X.X.X.X`.

5. **Filter by Packet Length:**
   - To filter packets based on length, you can use `frame.len == Length`.

6. **Filter by HTTP Host:**
   - To filter HTTP traffic for a specific host, use `http.host == example.com`.

7. **Filter by DNS Queries:**
   - To filter DNS queries, use `dns.flags.response == 0`.

**Indicators of Compromise (IOCs) and Signs to Look Out For:**

1. **Unusual Outbound Traffic:**
   - Look for unexpected outbound traffic to unknown or suspicious IP addresses.

2. **Unusual Protocols or Ports:**
   - Traffic on uncommon ports or using unusual protocols may indicate a security issue.

3. **Large Data Transfers:**
   - Excessive data transfers might be a sign of data exfiltration.

4. **Multiple Failed Login Attempts:**
   - Repeated failed login attempts may indicate a brute-force attack.

5. **DNS Anomalies:**
   - Look for DNS requests to suspicious domains or unusual query patterns.

6. **HTTP Errors and Status Codes:**
   - Check for HTTP errors (e.g., 404, 500) or suspicious status codes.

7. **Unusual Packet Lengths:**
   - Abnormally large or small packet lengths may indicate network anomalies.

8. **TCP RST and FIN Flags:**
   - Look for abnormal termination flags that could indicate a connection reset.

9. **Non-Standard SSL/TLS Versions:**
   - Use indicators like SSL/TLS versions (e.g., SSLv2, SSLv3) to detect deprecated or insecure protocols.

10. **Suspicious Payloads:**
    - Analyze packet payloads for malicious content or encoded data.

11. **Anomalies in DNS Responses:**
    - Unexpected IP addresses in DNS responses or DNS resolutions to known malicious domains.

12. **Unusual User-Agent Strings:**
    - Look for uncommon or suspicious user-agent strings in HTTP headers.

13. **Unusual Traffic Times:**
    - Traffic at unusual times or irregular patterns may indicate unusual activity.

It's important to note that the effectiveness of your investigation largely depends on your familiarity with network protocols, IOCs, and the specific context of your network. Also, be aware that false positives can occur.