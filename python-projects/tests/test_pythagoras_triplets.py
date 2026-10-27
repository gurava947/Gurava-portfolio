import unittest

from support import run_solution


class PythagorasTripletsTest(unittest.TestCase):
    def test_case_01_n_15(self):
        """N = 15."""
        result = run_solution('pythagoras-triplets', '15\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '4\n')

    def test_case_02_n_12(self):
        """N = 12."""
        result = run_solution('pythagoras-triplets', '12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n')


if __name__ == "__main__":
    unittest.main()
