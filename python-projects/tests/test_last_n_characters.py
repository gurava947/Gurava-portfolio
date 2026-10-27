import unittest

from support import run_solution


class LastNCharactersTest(unittest.TestCase):
    def test_case_01_python_last_3(self):
        """Python last 3."""
        result = run_solution('last-n-characters', 'Python\n3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'hon\n')

    def test_case_02_hello_last_2(self):
        """Hello last 2."""
        result = run_solution('last-n-characters', 'Hello\n2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'lo\n')

    def test_edge_01_n_larger_than_string(self):
        """N larger than string."""
        result = run_solution('last-n-characters', 'Hi\n5')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hi\n')

    def test_edge_02_n_zero(self):
        """N zero."""
        result = run_solution('last-n-characters', 'Hi\n0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')


if __name__ == "__main__":
    unittest.main()
