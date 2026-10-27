import unittest

from support import run_solution


class StringRepetition3Test(unittest.TestCase):
    def test_case_01_python_twice(self):
        """Python twice."""
        result = run_solution('string-repetition-3', 'Python\n2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'honhon\n')

    def test_case_02_hello_once(self):
        """Hello once."""
        result = run_solution('string-repetition-3', 'Hello\n1')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'llo\n')

    def test_edge_01_zero_repeats(self):
        """Zero repeats."""
        result = run_solution('string-repetition-3', 'Python\n0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')

    def test_edge_02_empty_string(self):
        """Empty string."""
        result = run_solution('string-repetition-3', '\n3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')


if __name__ == "__main__":
    unittest.main()
