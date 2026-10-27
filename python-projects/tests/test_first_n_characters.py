import unittest

from support import run_solution


class FirstNCharactersTest(unittest.TestCase):
    def test_case_01_python_first_3(self):
        """Python first 3."""
        result = run_solution('first-n-characters', 'Python\n3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Pyt\n')

    def test_case_02_hello_first_2(self):
        """Hello first 2."""
        result = run_solution('first-n-characters', 'Hello\n2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'He\n')

    def test_edge_01_n_larger_than_string(self):
        """N larger than string."""
        result = run_solution('first-n-characters', 'Hi\n5')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hi\n')

    def test_edge_02_n_zero(self):
        """N zero."""
        result = run_solution('first-n-characters', 'Hi\n0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')


if __name__ == "__main__":
    unittest.main()
