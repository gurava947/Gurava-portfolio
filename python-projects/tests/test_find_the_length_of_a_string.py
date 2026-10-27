import unittest

from support import run_solution


class FindTheLengthOfAStringTest(unittest.TestCase):
    def test_case_01_hello(self):
        """Hello."""
        result = run_solution('find-the-length-of-a-string', 'Hello\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n')

    def test_case_02_hello_world(self):
        """Hello World."""
        result = run_solution('find-the-length-of-a-string', 'Hello World\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '11\n')

    def test_edge_01_empty_line(self):
        """Empty line."""
        result = run_solution('find-the-length-of-a-string', '\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')

    def test_edge_02_unicode_line(self):
        """Unicode line."""
        result = run_solution('find-the-length-of-a-string', 'ನಮಸ್ಕಾರ\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7\n')


if __name__ == "__main__":
    unittest.main()
